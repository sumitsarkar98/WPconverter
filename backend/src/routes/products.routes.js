// routes/uploadRoute.js
import express from "express";

import { wtpConverter } from "../controllers/wtp.controller.js";
import { ptwConverter } from "../controllers/ptw.controller.js";
import { mergePdf } from "../controllers/mergepdf.controller.js";

import { ensureUploadFolders } from "../middleware/fileUploadSafety.middleware.js";

const router = express.Router();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // limit each IP to 20 requests per windowMs
//   message: "Too many requests from this IP, please try again later.",
// });

router.post("/wordtopdf", ensureUploadFolders, wtpConverter);
router.post("/pdftoword", ensureUploadFolders, ptwConverter);
router.post("/mergepdf", ensureUploadFolders, mergePdf);
export default router;
