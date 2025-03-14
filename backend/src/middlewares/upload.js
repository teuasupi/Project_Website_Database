const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Konfigurasi storage untuk Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir;
    
    // Tentukan folder berdasarkan jenis upload
    if (req.uploadType === 'profile') {
      uploadDir = path.join(__dirname, '../../public/assets/users');
    } else if (req.uploadType === 'article') {
      uploadDir = path.join(__dirname, '../../public/assets/articles');
    } else if (req.uploadType === 'event') {
      uploadDir = path.join(__dirname, '../../public/assets/events');
    } else {
      uploadDir = path.join(__dirname, '../../public/assets/others');
    }
    
    // Buat direktori jika belum ada
    createDirIfNotExists(uploadDir);
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Filter file untuk memeriksa tipe file yang diizinkan
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasan ukuran file (5MB)
  }
});

// Middleware untuk upload profil pengguna
exports.uploadProfilePhoto = (req, res, next) => {
  req.uploadType = 'profile';
  const uploadSingle = upload.single('profilePhoto');
  
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Error dari Multer
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Error lainnya
      return res.status(400).json({ error: err.message });
    }
    
    // Jika upload berhasil dan file ada
    if (req.file) {
      req.body.profilePhoto = `/assets/users/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware untuk upload gambar artikel
exports.uploadArticleImage = (req, res, next) => {
  req.uploadType = 'article';
  const uploadSingle = upload.single('featureImage');
  
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (req.file) {
      req.body.featureImage = `/assets/articles/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware untuk upload gambar event
exports.uploadEventImage = (req, res, next) => {
  req.uploadType = 'event';
  const uploadSingle = upload.single('featuredImage');
  
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (req.file) {
      req.body.featuredImage = `/assets/events/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware untuk upload file resume aplikasi
exports.uploadResumeFile = (req, res, next) => {
  const resumeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '../../public/assets/resumes');
      createDirIfNotExists(uploadDir);
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  });
  
  const resumeUpload = multer({ 
    storage: resumeStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB untuk file resume
  });
  
  const uploadSingle = resumeUpload.single('resumeFile');
  
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (req.file) {
      req.body.resumeFile = `/assets/resumes/${req.file.filename}`;
    }
    
    next();
  });
};