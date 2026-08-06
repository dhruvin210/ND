"use client";

import { useState } from "react";

export default function LeadForm({ serviceTitle }: { serviceTitle: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: serviceTitle }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-6 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-700">
        Thanks! Our team will reach out shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
      />
      <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-3">
        <span className="text-sm text-muted">🇮🇳 +91</span>
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className="w-full text-sm outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-gradient-to-r from-brand to-[#0a1e3f] py-3 text-sm font-bold text-white transition-opacity disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Get In Touch →"}
      </button>
    </form>
  );
}