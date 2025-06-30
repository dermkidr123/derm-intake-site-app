// netlify/functions/submit.js

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    // Here you would save the data to a database or send an email, etc.
    // For demo, just log and return success
    console.log('Received form data:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission received.' }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request.' }),
    };
  }
};