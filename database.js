
import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

import { SUPABASE_CONFIG } from "../config.js";

const projectUrl = SUPABASE_CONFIG.URL;
const publishableKey = SUPABASE_CONFIG.KEY;

const isConfigured =
  projectUrl &&
  projectUrl.startsWith("https://") &&
  !projectUrl.includes("YOUR_") &&
  publishableKey &&
  !publishableKey.includes("YOUR_");

export const supabase = isConfigured
  ? createClient(projectUrl, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export function isDatabaseConnected() {
  return Boolean(supabase);
}
