const ExcelJS = require('exceljs');

// Function to save payment data to Excel
async function savePaymentData(payload) {
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    // Load existing file or create new
    await workbook.xlsx.readFile('payments.xlsx');
    worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Payments');
      worksheet.columns = [
        { header: 'Order ID', key: 'order_id', width: 20 },
        { header: 'Payment ID', key: 'payment_id', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Amount', key: 'amount', width: 10 },
        { header: 'Timestamp', key: 'timestamp', width: 25 },
      ];
    }
  } catch (error) {
    // If file doesn't exist, create new
    worksheet = workbook.addWorksheet('Payments');
    worksheet.columns = [
      { header: 'Order ID', key: 'order_id', width: 20 },
      { header: 'Payment ID', key: 'payment_id', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Timestamp', key: 'timestamp', width: 25 },
    ];
  }

  // Add new row with payload data
  worksheet.addRow(payload);

  // Save the file
  await workbook.xlsx.writeFile('payments.xlsx');
  console.log('Data saved to payments.xlsx');
}

// Example payload (replace with actual data from Razorpay)
const samplePayload = {
  order_id: 'order_123',
  payment_id: 'pay_456',
  status: 'success',
  amount: 1200,
  timestamp: new Date().toISOString(),
};

savePaymentData(samplePayload);
