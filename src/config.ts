/**
 * Project configuration.
 *
 * Everything lives here instead of .env files — edit the values below and
 * rebuild. These keys are all public, client-side keys: they ship inside the
 * JS bundle, so a visitor can read them either way. Never put a Supabase
 * `service_role` key (or any server secret) in this file.
 */

// Supabase — Project Settings → API in the Supabase dashboard.
export const SUPABASE_URL = "https://nmkavjhqmpmukdkzncda.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_Tzu-9yLcd457NQVl4WuCuw_UqDVuMc9";

// Admin panel — the single password for /admin.
// NOTE: this is a client-side gate. The password ships in the JS bundle, so it
// keeps casual visitors out, not a determined one. See ADMIN.md → Security.
export const ADMIN_PASSWORD = "greenBuild12311231";

// EmailJS — used by the contact form.
export const EMAILJS_SERVICE_ID = "service_vwt8dxq";
export const EMAILJS_TEMPLATE_ID = "template_vev4v7k";
export const EMAILJS_PUBLIC_KEY = "2u3CkghhN1yR_Bn0F";
