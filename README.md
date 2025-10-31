# 📸 Website PhotoBoot

Website **PhotoBooth sederhana berbasis Node.js** untuk mengambil gambar dari kamera, mengunggah foto, dan menyimpannya secara otomatis ke server.  
Aplikasi ini menggunakan **Express.js**, **EJS**, dan **Multer** untuk menangani upload file dan rendering halaman.

---

## 🚀 Fitur Utama

- 📷 **Ambil foto langsung dari kamera**
- 📤 **Upload banyak foto sekaligus**
- ✏️ **Edit foto langsung di browser**
- 💾 **Simpan hasil edit ke server (`/uploads`)**
- ⚡ **Antarmuka cepat dan responsif**
- 🛠️ Dibangun dengan Express.js dan EJS

---

## 🧩 Teknologi yang Digunakan

| Teknologi | Fungsi |
|------------|--------|
| [Node.js](https://nodejs.org/) | Server runtime |
| [Express.js](https://expressjs.com/) | Framework backend |
| [Multer](https://github.com/expressjs/multer) | Middleware upload file |
| [EJS](https://ejs.co/) | Template engine |
| [HTML5 + JS](https://developer.mozilla.org/en-US/docs/Web/HTML) | Tampilan dan pengambilan kamera |

---

## ⚙️ Instalasi dan Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/zxkky/website-photoboot.git
cd website-photoboot
```
2. Install Dependencies
```
npm install
```
3. Jalankan Server
```
node app.js
```
Server akan berjalan di:
```
http://localhost:3000
```
📁 Struktur Folder
```
website-photoboot/
│
├── node_modules/         # Folder dependencies
├── public/
│   └── uploads/          # Folder upload publik (akses dari browser)
├── uploads/              # Folder penyimpanan asli hasil foto
├── views/                # Template EJS (index, edit, dsb)
├── app.js                # File utama Express server
├── index.html            # File halaman utama (opsional)
├── package.json          # Konfigurasi proyek Node.js
└── package-lock.json
```
🔧 API Endpoint
Endpoint	Method	Deskripsi
```
/	GET	Halaman utama
/upload-cam	POST	Upload foto (base64 dari kamera)
/edit	GET	Halaman edit foto
/save-edited	POST	Simpan hasil edit foto
/uploads	Static	Menyajikan file hasil upload
```
🧱 Contoh Konfigurasi Storage Multer
```
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
```
### 💡 Catatan

Jika folder uploads/ tidak ada, akan dibuat otomatis.

Pastikan kamera browser diizinkan (Allow Camera Access).

File hasil upload dapat diakses lewat http://localhost:3000/uploads/namafile.png.

### 👨‍💻 Kontributor

### Dibuat oleh zxkky
