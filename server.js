// Minimal Express server for contact form email
const express = require('express');
const nodemailer = require('nodemailer');
const createDOMPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
    credentials: true
  }
));

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // limit each IP to 3 request per windowMs
  message: { error: 'Too many requests, Please try again later.' }
})

const window = new JSDOM('').window;
const DOMPurify = createDOMPurifier(window)

app.post('/api/contact', contactLimit, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sanitizedName = DOMPurify.sanitize(name)
  const sanitizedEmail = DOMPurify.sanitize(email)
  const sanitizedMessage = DOMPurify.sanitize(message)

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Website <${process.env.CONTACT_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission from Portfolio Website',
      text: `You have received a new message from your portfolio website:\n\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      html: `<h3>New message from your portfolio website</h3><p><strong>Name:</strong> ${sanitizedName}<br/><strong>Email:</strong> ${sanitizedEmail}<br/><strong>Message:</strong><br/>${sanitizedMessage}</p>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
