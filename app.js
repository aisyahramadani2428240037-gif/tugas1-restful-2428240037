const express = require('express');
const app = express();
app.use(express.json());

let toddlers = [
  { id: 1, nama: 'Alya', tanggalLahir: '2024-05-12', jenisKelamin: 'P', beratKg: 11.4, tinggiCm: 82 },
  { id: 2, nama: 'Rafi', tanggalLahir: '2023-11-03', jenisKelamin: 'L', beratKg: 12.8, tinggiCm: 86 },
  { id: 3, nama: 'Nadia', tanggalLahir: '2024-08-21', jenisKelamin: 'P', beratKg: 9.7, tinggiCm: 75 },
];

let nextId = 4;

app.get('/', (req, res) => {
  res.json({
    nama: 'Aisyah Ramadani',
    nim: '2428240037',
    topik: 8,
    namaTopik: 'Posyandu - Data Balita',
    endpoints: [
      'GET /toddlers',
      'GET /toddlers/:id',
      'POST /toddlers',
      'PUT /toddlers/:id',
      'DELETE /toddlers/:id',
      'GET /toddlers?jenisKelamin=L|P',
    ],
  });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}
module.exports = app;