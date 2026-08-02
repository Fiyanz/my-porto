# Project Roadmap & TODOs

Dokumen ini berisi daftar tugas dan fitur yang perlu diselesaikan ke depannya untuk menyempurnakan sistem web portofolio ini.

## 1. Integrasi Halaman Sisa (Backend ke Frontend)
Saat ini halaman Home dan Projects sudah terintegrasi dengan *backend* secara dinamis. Halaman berikut masih menggunakan data *hardcode* dan perlu diintegrasikan:
- [ ] **Skills Page (`/skills`)**: 
  - Buat model database `Skill` di FastAPI (kategori, nama teknologi, level/persentase, icon).
  - Buat *endpoint* CRUD untuk `Skill`.
  - Ubah `frontend/src/app/skills/page.tsx` untuk melakukan *fetch* data dari backend.
- [ ] **Experience Page (`/experience`)**: 
  - Buat model database `Experience` di FastAPI (rentang waktu, posisi, instansi/perusahaan, deskripsi singkat).
  - Buat *endpoint* CRUD untuk `Experience`.
  - Ubah `frontend/src/app/experience/page.tsx` untuk membaca data ini.
- [ ] **Contact Page (`/contact`)**: 
  - Pastikan *endpoint* POST `/contact` di backend sudah bisa menyimpan pesan ke database.
  - Hubungkan *form* simulasi terminal di frontend agar benar-benar menembak *endpoint* backend saat pengunjung mengirim pesan.

## 2. Admin Dashboard & Authentication
Fitur manajemen konten (CMS) internal agar Anda atau asisten Anda dapat menambah/mengubah data tanpa menyentuh kode.
- [ ] **Sistem Login**: Implementasi JWT Authentication (membuat UI form login di `frontend/src/app/admin/login`).
- [ ] **Dashboard Admin Layout**: Buat layout khusus admin (`frontend/src/app/admin/layout.tsx`) yang terproteksi (hanya bisa diakses jika ada token JWT valid).
- [ ] **Manajemen Proyek**: UI untuk menambah proyek baru (ingat: cukup masukkan *link GitHub* dan data akan terisi otomatis).
- [ ] **Manajemen Data Lainnya**: UI untuk menambah/mengubah Skills dan Experience.
- [ ] **Inbox Pesan**: UI untuk membaca pesan yang masuk dari halaman Contact.

## 3. Optimasi GitHub Integration
- [ ] **Token GitHub (PAT)**: Masukkan `GITHUB_TOKEN` ke dalam `.env` server (FastAPI) agar terhindar dari limitasi jumlah *request* API GitHub publik (saat ini dibatasi 60 request/jam untuk tanpa token).
- [ ] **Penyesuaian Visual GitHub Stats**: Menambahkan grafik *contribution* sesungguhnya (pacman/heatmap) jika dimungkinkan (opsional, bisa memakai *library* eksternal pihak ketiga).

## 4. Finalisasi & Deployment
- [ ] **SEO & Metadata**: Tambahkan *title*, *meta description*, dan *Open Graph tags* dinamis di Next.js agar portofolio bagus saat dibagikan di sosial media.
- [ ] **Deployment**: Persiapan *deploy* VPS/Server menggunakan `docker-compose up -d` dengan *reverse proxy* (Nginx) yang diset ke domain utama dan mengamankannya dengan HTTPS (Certbot/Let's Encrypt).
