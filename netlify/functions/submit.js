// netlify/functions/submit.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  console.log("🟢 Incoming data:", req.body);

  const { data, error } = await supabase
    .from('practices')
    .insert([req.body]);

  if (error) {
    console.error("🔴 Supabase insert error:", error);
    return res.status(500).json({ error });
  }

  console.log("✅ Data inserted:", data);
  return res.status(200).json({ status: 'success' });
};