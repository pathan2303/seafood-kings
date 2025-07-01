const express = require('express');
const { savePaymentData } = require('./saveToExcel');
const app = express();

app.use(express.json());

app.post('/save-payment', async (req, res) => {
  const payload = req.body;
  await savePaymentData(payload);
  res.json({ message: 'Data saved successfully' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
