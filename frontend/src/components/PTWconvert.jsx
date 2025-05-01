import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toast";

const PTWonvert = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [docxBlob, setDocxBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    if (file) {
      setFileName(file.name);
      setDocxBlob(null); // Reset previous docx blob if new file selected
    }
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!pdfFile) {
      toast.error("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      setIsConverting(true);
      const response = await axios.post(
        "http://localhost:5000/api/pdftoword", // ✅ Your backend endpoint
        formData,
        {
          responseType: "blob", // Important for downloading the DOCX as Blob
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const docxFile = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      setDocxBlob(docxFile);
      toast.success("Conversion successful!");
    } catch (error) {
      console.error("Error uploading or converting file:", error);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (docxBlob) {
      const url = window.URL.createObjectURL(docxBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.replace(/\.[^.]+$/, ".docx"); // Replace extension with .docx
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      toast.success("DOCX downloaded successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 md:py-30 lg:py-40 my-20 px-5">
      <div className="converterCard w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-purple-600 underline">
          PDF to Word Converter
        </h2>

        <div className="flex flex-col gap-4">
          {/* File input */}
          <div className="flex flex-col justify-center">
            <label htmlFor="pdf-file" className="text-xl text-purple-900 mb-2">
              Choose PDF File:
            </label>
            <input
              id="pdf-file"
              name="file" // ✅ FIXED
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="border border-gray-200 rounded-lg p-2 opacity-80 bg-gray-400 text-dark"
            />
            {fileName && (
              <div className="mt-2 text-sm text-gray-600 underline">
                Selected file: {fileName}
              </div>
            )}
          </div>

          {/* Show converting... */}
          {isConverting && (
            <div className="text-center mt-4 text-gray-600">
              Converting... Please wait...
            </div>
          )}

          {/* Button */}
          <div className="text-center mt-4">
            {docxBlob ? (
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Download DOCX
              </button>
            ) : (
              <button
                onClick={handleConvert}
                className="bg-purple-700 text-white py-2 px-6 rounded-lg hover:bg-purple-500 transition duration-300"
                disabled={isConverting}
              >
                {isConverting ? "Converting..." : "Convert Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" delay={2000} />
    </div>
  );
};

export default PTWonvert;
