import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFMerger from "pdf-merger-js";
import multer from "multer";

// ES Module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads folder setup
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("pdf", 4); // accept up to 10 PDFs

// Controller logic
export const mergePdf = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).send("File upload failed");
    }

    const merger = new PDFMerger();

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded");
      }

      for (const file of req.files) {
        if (file.mimetype !== "application/pdf") {
          return res.status(400).send("Only PDF files are allowed");
        }
        await merger.add(file.path);
      }

      const outputFileName = `merged_${Date.now()}.pdf`;
      const outputPath = path.join(uploadPath, outputFileName);
      await merger.save(outputPath);

      // Delete uploaded files
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });

      // Send merged file
      res.download(outputPath, outputFileName, () => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      });
    } catch (error) {
      console.error("Error during PDF merge:", error);
      res.status(500).send("Error during PDF merge");
    }
  });
};
