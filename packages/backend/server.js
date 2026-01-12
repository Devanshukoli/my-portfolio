// Minimal Express server for contact form email
const express = require('express');
const nodemailer = require('nodemailer');
const createDOMPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: '../../.env' });

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
    credentials: true
  }
));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_EMAIL_PASS,
  },
});

const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // limit each IP to 3 request per windowMs
  message: { error: 'Too many requests, Please try again later.' }
});

const window = new JSDOM('').window;
const DOMPurify = createDOMPurifier(window)

app.post('/api/contact', contactLimit, async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // valdiate email lengths
  if (name.length > 100 || email.length > 100 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long.' });
  }

  const sanitizedName = DOMPurify.sanitize(name)
  const sanitizedEmail = DOMPurify.sanitize(email)
  const sanitizedMessage = DOMPurify.sanitize(message)

  try {
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

// --- Blog API: serve markdown posts from data/blog ---
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Get the directory where server.js is located
const __basedir = __dirname;

app.get('/api/posts', (req, res) => {
  try {
    const postsDir = path.join(__basedir, '..', 'shared', 'data', 'blog');

    if (!fs.existsSync(postsDir)) {
      return res.json([]);
    }

    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md') && f !== 'README.md');

    const posts = files.map((file) => {
      const fullPath = path.join(postsDir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data: frontmatter, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ''), frontmatter, content: marked.parse(content) };
    });

    posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
    res.json(posts.map(p => ({ slug: p.slug, frontmatter: p.frontmatter })));
  } catch (err) {
    console.error('Error loading posts:', err);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

app.get('/api/posts/:slug', (req, res) => {
  try {
    const postsDir = path.join(__basedir, '..', 'shared', 'data', 'blog');
    const file = path.join(postsDir, `${req.params.slug}.md`);

    if (!fs.existsSync(file)) {
      return res.status(404).json({ error: 'Not found' });
    }

    const raw = fs.readFileSync(file, 'utf8');
    const { data: frontmatter, content } = matter(raw);
    const html = marked.parse(content);
    res.json({ slug: req.params.slug, frontmatter, content: html });
  } catch (err) {
    console.error('Error loading post:', err);
    res.status(500).json({ error: 'Failed to load post' });
  }
});
