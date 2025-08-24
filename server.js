import express from 'express';
import { Resend } from 'resend';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const resend = new Resend('re_2x24tYad_6LjeTTJjwjPUkWkBPNvMgLQz');
// const resend = new Resend(process.env.RESEND_API_KEY);

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

// Simple test route to check if server is running
app.get('/', (req, res) => {
  res.status(200).send('Backend server is running!');
});

// API Endpoint for sending email
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be a verified domain in Resend
      to: 'pauloabaquita098956@gmail.com', // Your target email address
      subject: `New message from ${name} (${email})`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    // Also log the specific error details from Resend, if available
    if (error && error.name === "ResendError") {
        console.error("Resend Error Details:", error.message, error.statusCode, error.cause);
    }
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
});

// Catch-all for 404 - MUST be after all other routes
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Not Found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler - MUST be last middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected error occurred.',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
