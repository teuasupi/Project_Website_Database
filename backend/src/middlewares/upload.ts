import { Request, Response, NextFunction } from "express";
import multer from "multer";
import * as path from "path";
import * as fs from "fs";

interface UploadRequest extends Request {
  uploadType?: string;
}

const createDirIfNotExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req: UploadRequest, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    let uploadDir: string;
    
    // Determine folder based on upload type
    if (req.uploadType === 'profile') {
      uploadDir = path.join(__dirname, '../../public/assets/users');
    } else if (req.uploadType === 'article') {
      uploadDir = path.join(__dirname, '../../public/assets/articles');
    } else if (req.uploadType === 'event') {
      uploadDir = path.join(__dirname, '../../public/assets/events');
    } else {
      uploadDir = path.join(__dirname, '../../public/assets/others');
    }
    
    // Create directory if it doesn't exist
    createDirIfNotExists(uploadDir);
    
    cb(null, uploadDir);
  },
  filename: function (req: UploadRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext: string = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// File filter to check allowed file types
const fileFilter = (req: UploadRequest, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // File size limit (5MB)
  }
});

// Middleware for profile photo upload
export const uploadProfilePhoto = (req: UploadRequest, res: Response, next: NextFunction): void => {
  req.uploadType = 'profile';
  const uploadSingle = upload.single('profilePhoto');
  
  uploadSingle(req, res, function (err: unknown) {
    if (err instanceof multer.MulterError) {
      // Multer error
      const message = err instanceof Error ? err.message : "Upload error occurred";
      return res.status(400).json({ error: message });
    } else if (err) {
      // Other errors
      const message = err instanceof Error ? err.message : "Upload error occurred";
      return res.status(400).json({ error: message });
    }
    
    // If upload successful and file exists
    if (req.file) {
      req.body.profilePhoto = `/assets/users/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware for article image upload
export const uploadArticleImage = (req: UploadRequest, res: Response, next: NextFunction): void => {
  req.uploadType = 'article';
  const uploadSingle = upload.single('featureImage');
  
  uploadSingle(req, res, function (err: unknown) {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload error occurred";
      return res.status(400).json({ error: message });
    }
    
    if (req.file) {
      req.body.featureImage = `/assets/articles/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware for event image upload
export const uploadEventImage = (req: UploadRequest, res: Response, next: NextFunction): void => {
  req.uploadType = 'event';
  const uploadSingle = upload.single('featuredImage');
  
  uploadSingle(req, res, function (err: unknown) {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload error occurred";
      return res.status(400).json({ error: message });
    }
    
    if (req.file) {
      req.body.featuredImage = `/assets/events/${req.file.filename}`;
    }
    
    next();
  });
};

// Middleware for resume file upload
export const uploadResumeFile = (req: UploadRequest, res: Response, next: NextFunction): void => {
  const resumeStorage = multer.diskStorage({
    destination: function (req: UploadRequest, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
      const uploadDir: string = path.join(__dirname, '../../public/assets/resumes');
      createDirIfNotExists(uploadDir);
      cb(null, uploadDir);
    },
    filename: function (req: UploadRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
      const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext: string = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  });
  
  const resumeUpload = multer({ 
    storage: resumeStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB for resume files
  });
  
  const uploadSingle = resumeUpload.single('resumeFile');
  
  uploadSingle(req, res, function (err: unknown) {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload error occurred";
      return res.status(400).json({ error: message });
    }
    
    if (req.file) {
      req.body.resumeFile = `/assets/resumes/${req.file.filename}`;
    }
    
    next();
  });
};