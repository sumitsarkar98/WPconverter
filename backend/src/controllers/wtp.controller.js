import multer from "multer";
import docxConverter from "docx-pdf";
import path from "path";
import fs from "fs";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Upload and convert controller
export const wtpConverter = (req, res) => {
  try {
    upload.single("file")(req, res, function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "File upload failed", error: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = req.file.path;
      const ext = path.extname(filePath).toLowerCase();

      if (ext === ".docx") {
        const pdfPath = filePath.replace(/\.docx$/, ".pdf");

        docxConverter(filePath, pdfPath, function (conversionErr) {
          if (conversionErr) {
            return res
              .status(500)
              .json({ message: "Conversion failed", error: conversionErr });
          }

          // Delete original .docx after conversion
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Failed to delete .docx file:", unlinkErr);
            }
          });

          // Send the converted PDF file
          res.sendFile(path.resolve(pdfPath), (sendFileErr) => {
            if (sendFileErr) {
              return res
                .status(500)
                .json({ message: "PDF sending failed", error: sendFileErr });
            }

            // After sending, delete the PDF file (optional, good practice)
            fs.unlink(pdfPath, (unlinkPdfErr) => {
              if (unlinkPdfErr) {
                console.error("Failed to delete .pdf file:", unlinkPdfErr);
              }
            });
          });
        });
      } else {
        // If the uploaded file is not a .docx
        return res.status(400).json({
          message: "Only .docx files are supported for conversion",
        });
      }
    });
  } catch (error) {
    console.error("Error in uploadFile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
