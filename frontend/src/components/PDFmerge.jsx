import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toast";

const PDFMerger = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [mergedBlob, setMergedBlob] = useState(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPdfFiles(files);
    setFileNames(files.map((f) => f.name));
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      toast.error("Please select at least two PDF files.");
      return;
    }

    const formData = new FormData();
    pdfFiles.forEach((file) => formData.append("pdf", file));

    try {
      setIsMerging(true);
      const response = await axios.post(
        "http://wp-converter.onrender.com/api/mergepdf",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const merged = new Blob([response.data], { type: "application/pdf" });
      setMergedBlob(merged);
      toast.success("PDFs merged successfully!");
    } catch (error) {
      console.error("Merge failed:", error);
      toast.error("Failed to merge PDFs. Try again.");
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (mergedBlob) {
      const url = window.URL.createObjectURL(mergedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      toast.success("Merged PDF downloaded!");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 my-20 px-5">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600 underline">
          Merge PDF Files
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center">
            <label htmlFor="pdf-files" className="text-xl text-indigo-900 mb-2">
              Choose PDF Files:
            </label>
            <input
              id="pdf-files"
              name="pdf"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="border border-gray-200 rounded-lg p-2 opacity-80 bg-gray-400 text-dark"
            />
            {fileNames.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 underline">
                Selected: {fileNames.join(", ")}
              </div>
            )}
          </div>

          {isMerging && (
            <div className="text-center text-gray-600">
              Merging PDFs... Please wait...
            </div>
          )}

          <div className="text-center mt-4">
            {mergedBlob ? (
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Download Merged PDF
              </button>
            ) : (
              <button
                onClick={handleMerge}
                className="bg-indigo-700 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition duration-300"
                disabled={isMerging}
              >
                {isMerging ? "Merging..." : "Merge Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" delay={2000} />
    </div>
  );
};

export default PDFMerger;
