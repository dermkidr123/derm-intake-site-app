import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body);
    console.log("🟢 Incoming data:", body);

    const { data, error } = await supabase
      .from('practices')
      .insert([body]);

    if (error) {
      console.error("🔴 Supabase insert error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };
    }

    console.log("✅ Data inserted:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' }),
    };
  } catch (err) {
    console.error("🔴 Unexpected error:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request.' }),
    };
  }
};