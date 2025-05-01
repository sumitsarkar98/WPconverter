import multer from "multer";
import fs from "fs";
import path from "path";
import pdf2json from "pdf2json";
import { Document, Packer, Paragraph } from "docx";
// import sanitize from "sanitize-filename";

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error("Only PDF files are allowed"));
    }
  },
}).single("file");

const ptwConverter = (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        console.error("Upload Error:", err);
        return res
          .status(500)
          .json({ message: "File upload error", error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      if (!req.file.path) {
        return res
          .status(400)
          .json({ message: "Uploaded file path is missing" });
      }

      const pdfPath = req.file.path;
      console.log("Uploaded PDF file path:", pdfPath);

      const ext = path.extname(pdfPath).toLowerCase();
      if (ext !== ".pdf") {
        return res.status(400).json({ message: "File is not a PDF" });
      }

      const pdfParser = new pdf2json();

      pdfParser.on("pdfParser_dataError", (err) => {
        console.error("PDF Parsing Error:", err.parserError);
        return res.status(500).json({
          message: "PDF parsing failed",
          error: err.parserError.message,
        });
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        if (!pdfData?.Pages) {
          return res
            .status(400)
            .json({ message: "No readable pages found in the PDF." });
        }

        const extractedText = pdfData.Pages.map((page) =>
          page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
        ).join("\n");

        const doc = new Document({
          sections: [
            {
              properties: {},
              children: extractedText
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line) => new Paragraph(line)),
            },
          ],
        });

        Packer.toBuffer(doc)
          .then((docxBuffer) => {
            const convertedDir = "converted";
            if (!fs.existsSync(convertedDir)) {
              fs.mkdirSync(convertedDir);
            }

            const outputFileName = path.basename(pdfPath, ".pdf") + ".docx";
            const outputPath = path.join(convertedDir, outputFileName);

            fs.writeFileSync(outputPath, docxBuffer);
            console.log(`Converted DOCX file saved at: ${outputPath}`);

            res.download(outputPath, outputFileName, async (err) => {
              if (err) {
                console.error("Download Error:", err);
                return res
                  .status(500)
                  .send("Error sending the converted file.");
              }

              try {
                await fs.promises.unlink(pdfPath); // Delete uploaded PDF
                await fs.promises.unlink(outputPath); // Delete converted DOCX
                console.log("Cleanup completed.");
              } catch (cleanupErr) {
                console.error("Cleanup Error:", cleanupErr);
              }
            });
          })
          .catch((error) => {
            console.error("Error converting to DOCX:", error);
            res.status(500).json({
              message: "Error creating DOCX from PDF",
              error: error.message,
            });
          });
      });

      pdfParser.loadPDF(pdfPath);
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { ptwConverter };
