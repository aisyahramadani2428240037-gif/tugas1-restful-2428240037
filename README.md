# Tugas 1 - RESTful API Murni dengan Express.js

- **Nama:** Aisyah Ramadani
- **NIM:** 2428240037
- **Kelas:** SI5B
- **Nomor Topik:** 8 - Posyandu: Data Balita
- **Link Vercel:** (diisi setelah deploy)

## Cara Menjalankan Lokal

1. Pasang dependensi:
```
   npm install
```
2. Jalankan server:
```
   npm run dev
```
3. Buka `http://localhost:3000`.

## Daftar Endpoint

| Method | Endpoint | Fungsi | Status sukses |
|---|---|---|---|
| GET | `/` | Info API | 200 |
| GET | `/toddlers` | Ambil semua data balita | 200 |
| GET | `/toddlers/:id` | Ambil satu data balita | 200 |
| POST | `/toddlers` | Tambah data balita | 201 |
| PUT | `/toddlers/:id` | Ubah seluruh data balita | 200 |
| DELETE | `/toddlers/:id` | Hapus data balita | 200 |
| GET | `/toddlers?jenisKelamin=L` | Filter berdasarkan jenis kelamin (L/P) | 200 |

## Field Data Balita

| Field | Tipe | Wajib |
|---|---|---|
| nama | string | ya |
| tanggalLahir | string (YYYY-MM-DD) | ya |
| jenisKelamin | "L" atau "P" | ya |
| beratKg | number | ya |
| tinggiCm | number | tidak |