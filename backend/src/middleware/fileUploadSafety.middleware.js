import fs from "fs";
import path from "path";

// Ensure folders exist before file upload
export const ensureUploadFolders = (req, res, next) => {
  try {
    const uploadDirs = ["uploads", "converted"];
    uploadDirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    });
    next();
  } catch (err) {
    console.error("Middleware folder check error:", err);
    res.status(500).json({ message: "Server setup error", error: err.message });
  }
};
