const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(uploadDir));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 🏠 Halaman utama pemilihan kamera
app.get('/', (req, res) => res.render('index'));

// 📤 Upload foto ke dalam folder uploads
// 📤 Upload foto ke dalam folder uploads
// app.post('/upload', upload.array('photos', 10), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).send('Tidak ada file diupload.');
//   }

//   const imagePaths = req.files.map(f => `/uploads/${f.filename}`);
//   res.render('edit', { images: imagePaths });
// });
// 📤 Upload foto dari kamera (base64)
app.post('/upload-cam', (req, res) => {
  const images = req.body.images;
  if (!images || !Array.isArray(images) || images.length === 0)
    return res.status(400).send('Tidak ada gambar.');

  const savedPaths = [];
  for (const base64Str of images) {
    const imageData = base64Str.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(uploadDir, `photo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}.png`);
    fs.writeFileSync(filePath, imageData, 'base64');
    savedPaths.push(`/uploads/${path.basename(filePath)}`);
  }


  res.render('edit', { images: savedPaths });
});

// ✏️ Halaman edit (mendukung 1 & banyak foto)
app.get('/edit', (req, res) => {
  const image = req.query.image;

  // Kalau dari kamera (1 foto)
  if (image) {
    return res.render('edit', { images: [image] });
  }

  // Kalau langsung akses tanpa upload, kembali ke /
  return res.redirect('/');
});

app.post('/save-edited', (req, res) => {
  const imageData = req.body.image;
  if (!imageData) return res.json({ success: false });

  const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
  const filePath = path.join(uploadDir, `edited_${Date.now()}.png`);

  fs.writeFile(filePath, base64Data, 'base64', err => {
    if (err) return res.json({ success: false });
    res.json({ success: true, file: `/uploads/${path.basename(filePath)}` });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () =>
  console.log(`🚀 Server berjalan di http://localhost:${port}`)
);
