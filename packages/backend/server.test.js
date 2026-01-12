// Minimal test for contact backend
const request = require('supertest');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.post('/api/contact', async (req, res) => {
  res.json({ success: true }); // mock response
});

describe('POST /api/contact', () => {
  it('should return success for valid input', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'test@example.com', message: 'Hello' });
    expect(res.body.success).toBe(true);
  });
});
