# Implementation Plan: Full Backend Integration & Admin Dashboard

## 1. Goal Description
Saat ini data di semua halaman (`/home`, `/projects`, `/skills`, `/experience`) masih di-*hardcode* di *frontend* (Next.js). Tujuannya adalah mengintegrasikan seluruh halaman tersebut agar membaca data dinamis (secara *real-time* atau *cached*) dari *backend* (FastAPI) dan PostgreSQL. 

Selain itu, akan dibuatkan halaman khusus **Admin** di Next.js (dengan autentikasi JWT) agar Anda atau asisten Anda dapat melakukan proses CRUD (Create, Read, Update, Delete) untuk mengatur isi portofolio tanpa harus menyentuh kode lagi.

## 2. User Review Required
> [!IMPORTANT]
> **Data Migration**: Karena kita beralih ke database penuh, data statis yang sekarang ada di *frontend* harus kita masukkan (*seed*) ke dalam database PostgreSQL.
>
> **GitHub PAT (Personal Access Token)**: Khusus untuk data aktivitas GitHub di halaman *Home*, dibutuhkan *token* GitHub agar tidak terkena limit *request*.

## 3. Open Questions
> [!NOTE]
> 1. Untuk desain halaman `/admin`, apakah kamu ingin desain yang sangat sederhana dan fungsional (tabel & form), atau tetap dengan tema *border tebal/retro* seperti halaman utama?
> 2. Apakah asistenmu butuh *role* khusus (misalnya hanya bisa merespons pesan kontak dan tidak bisa mengubah *skill*), atau cukup satu akun Admin *super-user* yang bisa mengontrol semuanya?

## 4. Proposed Changes

---

### Backend (FastAPI)
Kita sudah memiliki struktur model di `server/app/models/` dan router di `server/app/routers/` (untuk `projects.py`, `auth.py`, `contact.py`, dll). Langkah selanjutnya adalah:

1. **GitHub Service (`server/app/routers/github.py`)**: 
   - Endpoint khusus untuk menarik data dari GitHub API dan melakukan *caching*.
2. **Menyempurnakan CRUD API**:
   - Memastikan endpoint `/projects`, `/skills`, `/experience` dan `/contact` sudah 100% siap untuk operasi GET (publik) dan POST/PUT/DELETE (harus dengan token JWT Admin).
3. **Migrasi Database (Alembic)**:
   - Membuat revisi Alembic baru dan menjalankan `alembic upgrade head` untuk membuat tabel-tabel tersebut di PostgreSQL.

---

### Frontend (Next.js) - Publik
Mengubah seluruh halaman agar mengambil data (*fetch*) dari API FastAPI.

#### [MODIFY] `frontend/src/app/page.tsx`
Mengubah data statis (seperti jumlah repo, stats, activity) menjadi *fetch* dari `http://server:8000/api/github/stats` dan `http://server:8000/api/users/me`.

#### [MODIFY] `frontend/src/app/projects/page.tsx`
Melakukan *fetch* ke `http://server:8000/api/projects` untuk menampilkan daftar proyek secara dinamis.

#### [MODIFY] `frontend/src/app/skills/page.tsx` & `frontend/src/app/experience/page.tsx`
Sama seperti Projects, data akan di-*fetch* dari backend, memungkinkan persentase *skill* atau entri pengalaman bertambah sesuai database.

---

### Frontend (Next.js) - Admin Dashboard
Membuat folder `admin/` di dalam `src/app/` untuk halaman manajemen.

#### [NEW] `frontend/src/app/admin/login/page.tsx`
Halaman *login* yang akan meminta email & password, kemudian menembak `/api/auth/login` untuk mendapatkan JWT token (disimpan di *Cookies/LocalStorage*).

#### [NEW] `frontend/src/app/admin/layout.tsx`
Layout khusus admin (mungkin berbeda dari pengunjung biasa, dengan menu khusus CRUD: *Manage Projects*, *Manage Skills*, *Inbox Contact*, dll).

#### [NEW] `frontend/src/app/admin/dashboard/page.tsx`
Halaman panel kendali untuk menambah/mengedit proyek, pengalaman, atau merespons pesan yang masuk dari halaman *Contact*.

## 5. Verification Plan
- **Backend Tests**: 
  - *Seeding* data awal via *script* Python.
  - Test akses API via Swagger UI (`http://localhost:8001/docs`) untuk memastikan token JWT berfungsi dan memblokir akses *unauthorized*.
- **Frontend Publik**:
  - Memastikan *loading state* berjalan dengan baik saat *fetch* data.
  - Memastikan tidak ada desain yang rusak setelah datanya dinamis.
- **Frontend Admin**:
  - Simulasi *login*, lalu mencoba membuat proyek baru dan memastikan proyek tersebut otomatis muncul di halaman `/projects`.
