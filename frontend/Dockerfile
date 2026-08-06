# ---- deps ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars must be available as both ARG and ENV at build time -
# Next.js inlines them into the client bundle during `npm run build`.
# Passed in via CI's build_args input; runtime `environment:` in
# docker-compose.yml has no effect on these once the image is built.
ARG NEXT_PUBLIC_SITE_URL=https://www.nextdynamix.avinyaglobal.com
ARG NEXT_PUBLIC_API_URL=https://api.nextdynamix.avinyaglobal.com
ARG NEXT_PUBLIC_CMS_URL=https://cms.nextdynamix.avinyaglobal.com
ARG NEXT_PUBLIC_CMS_HOSTNAME=cms.nextdynamix.avinyaglobal.com
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
ARG NEXT_PUBLIC_HUBSPOT_PORTAL_ID=00000000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_CMS_URL=$NEXT_PUBLIC_CMS_URL \
    NEXT_PUBLIC_CMS_HOSTNAME=$NEXT_PUBLIC_CMS_HOSTNAME \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_CLARITY_PROJECT_ID=$NEXT_PUBLIC_CLARITY_PROJECT_ID \
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID=$NEXT_PUBLIC_HUBSPOT_PORTAL_ID

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=build --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nextjs /app/public ./public
USER nextjs
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
