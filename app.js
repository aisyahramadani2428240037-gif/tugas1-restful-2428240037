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

// GET /toddlers
// Ambil semua data. Bisa difilter: GET /toddlers?jenisKelamin=P
app.get('/toddlers', (req, res) => {
  const { jenisKelamin } = req.query;

  // kalau ada filter, saring datanya
  if (jenisKelamin) {
    const hasil = toddlers.filter((t) => t.jenisKelamin === jenisKelamin);
    return res.json(hasil);
  }

  // kalau tidak ada filter, kirim semua data
  res.json(toddlers);
});

// GET /toddlers/:id
// Ambil satu data berdasarkan id
app.get('/toddlers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const toddler = toddlers.find((t) => t.id === id);

  // data tidak ada -> 404
  if (!toddler) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.json(toddler);
});

// POST /toddlers
// Body: { "nama": "Citra", "tanggalLahir": "2024-01-15", "jenisKelamin": "P", "beratKg": 10.2, "tinggiCm": 79 }
app.post('/toddlers', (req, res) => {
  const { nama, tanggalLahir, jenisKelamin, beratKg, tinggiCm } = req.body;

  // validasi: field wajib tidak boleh kosong -> 400
  if (!nama || !tanggalLahir || !jenisKelamin || beratKg === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'nama, tanggalLahir, jenisKelamin, dan beratKg wajib diisi',
      data: null,
    });
  }

  // validasi: jenisKelamin hanya boleh L atau P -> 400
  if (jenisKelamin !== 'L' && jenisKelamin !== 'P') {
    return res.status(400).json({
      status: 'error',
      message: 'jenisKelamin harus L atau P',
      data: null,
    });
  }

  // validasi: beratKg harus angka -> 400
  if (typeof beratKg !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'beratKg harus berupa angka',
      data: null,
    });
  }

  // buat data baru, id otomatis dari nextId
  const baru = { id: nextId++, nama, tanggalLahir, jenisKelamin, beratKg, tinggiCm };
  toddlers.push(baru);

  // berhasil -> 201 + data yang baru dibuat
  res.status(201).json({
    status: 'success',
    message: 'Data berhasil ditambahkan',
    data: baru,
  });
});

// ======== MULAI KODE BARU LANGKAH 5 ========

// PUT /toddlers/:id
// Body: { "nama": "Alya Putri", "tanggalLahir": "2024-05-12", "jenisKelamin": "P", "beratKg": 12, "tinggiCm": 84 }
app.put('/toddlers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = toddlers.findIndex((t) => t.id === id);

  // data tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const { nama, tanggalLahir, jenisKelamin, beratKg, tinggiCm } = req.body;

  // validasi: field wajib tidak boleh kosong -> 400
  if (!nama || !tanggalLahir || !jenisKelamin || beratKg === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'nama, tanggalLahir, jenisKelamin, dan beratKg wajib diisi',
      data: null,
    });
  }

  // validasi: jenisKelamin hanya boleh L atau P -> 400
  if (jenisKelamin !== 'L' && jenisKelamin !== 'P') {
    return res.status(400).json({
      status: 'error',
      message: 'jenisKelamin harus L atau P',
      data: null,
    });
  }

  // validasi: beratKg harus angka -> 400
  if (typeof beratKg !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'beratKg harus berupa angka',
      data: null,
    });
  }

  // ganti seluruh data lama dengan data baru (id tetap)
  toddlers[index] = { id, nama, tanggalLahir, jenisKelamin, beratKg, tinggiCm };

  res.json({
    status: 'success',
    message: 'Data berhasil diubah',
    data: toddlers[index],
  });
});

// DELETE /toddlers/:id
app.delete('/toddlers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = toddlers.findIndex((t) => t.id === id);

  // data tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  // hapus 1 data pada posisi index
  toddlers.splice(index, 1);

  res.json({
    status: 'success',
    message: `Data balita dengan id ${id} berhasil dihapus`,
    data: null,
  });
});

// Catch-all 404: harus paling bawah, setelah semua route
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
});

// ======== SELESAI KODE BARU LANGKAH 5 ========

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}
module.exports = app;