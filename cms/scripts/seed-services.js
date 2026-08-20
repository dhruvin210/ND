'use strict';

/**
 * Seeds the 11 service landing pages into Strapi via the REST API.
 *
 * Usage:
 *   1. Start Strapi (npm run develop) and log into the admin.
 *   2. Settings -> API Tokens -> Create new API Token
 *        - Name: "Seed script"
 *        - Token type: Full access
 *      Copy the token (you only see it once).
 *   3. In this cms folder, run:
 *        STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=<paste-token-here> node scripts/seed-services.js
 *      (On Windows PowerShell, set env vars first, then run node - see below.)
 *   4. Re-running is safe: existing services are matched by slug and updated
 *      instead of duplicated. FAQs are deleted and recreated each run too,
 *      so re-running never produces duplicate FAQs.
 */

const services = require('./services-seed-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_TOKEN. Create a Full Access API token in Strapi admin');
  console.error('(Settings -> API Tokens) and set STRAPI_TOKEN before running this script.');
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${body}`);
  }

  // DELETE (and some other) responses can come back with an empty body
  // (204 No Content) - trying to JSON-parse that throws, so handle it.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function findServiceIdBySlug(slug) {
  const result = await api(`/services?filters[slug][$eq]=${encodeURIComponent(slug)}`);
  return result.data && result.data.length > 0 ? result.data[0].documentId : null;
}

async function upsertService(entry) {
  const { faqs, ...serviceData } = entry;

  const existingId = await findServiceIdBySlug(entry.slug);

  let serviceDocumentId;
  if (existingId) {
    console.log(`Updating existing service: ${entry.title}`);
    const updated = await api(`/services/${existingId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: serviceData }),
    });
    serviceDocumentId = updated.data.documentId;
  } else {
    console.log(`Creating new service: ${entry.title}`);
    const created = await api('/services', {
      method: 'POST',
      body: JSON.stringify({ data: serviceData }),
    });
    serviceDocumentId = created.data.documentId;
  }

  // Note: entries are created as drafts (draftAndPublish is enabled on
  // Service). Publish them from Strapi admin -> Content Manager -> Service
  // -> select all -> Publish, once you've reviewed the seeded content.

  // Seed this service's FAQs, linked via the `service` relation. Delete any
  // existing FAQs for this service first, so re-running this script never
  // creates duplicates.
  if (faqs && faqs.length) {
    const existingFaqs = await api(
      `/faqs?filters[service][documentId][$eq]=${encodeURIComponent(serviceDocumentId)}&pagination[pageSize]=100`,
    );
    for (const old of existingFaqs.data || []) {
      await api(`/faqs/${old.documentId}`, { method: 'DELETE' });
    }

    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i];
      await api('/faqs', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            question: faq.question,
            answer: faq.answer,
            page: 'services',
            order: i,
            service: serviceDocumentId,
          },
        }),
      });
    }
    console.log(`  -> replaced with ${faqs.length} FAQs`);
  }
}

async function main() {
  console.log(`Seeding ${services.length} services into ${STRAPI_URL} ...`);
  for (const entry of services) {
    try {
      await upsertService(entry);
    } catch (err) {
      console.error(`Failed on "${entry.title}":`, err.message);
    }
  }
  console.log('Done.');
}

main();
