import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toast";

const WTPconvert = () => {
  const [docFile, setDocFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocFile(file);
    if (file) {
      setFileName(file.name);
      setPdfBlob(null); // Reset previous pdf if new file selected
    }
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!docFile) {
      toast.error("Please select a DOC or DOCX file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", docFile);

    try {
      setIsConverting(true);
      const response = await axios.post(
        "https://wp-converter.onrender.com/api/wordtopdf",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const pdfFile = new Blob([response.data], { type: "application/pdf" });
      setPdfBlob(pdfFile);
      toast.success("Conversion successful!");
    } catch (error) {
      console.error("Error uploading or converting file:", error);
      toast.error("Conversion failed. Try again.");
    } finally {
      setIsConverting(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (pdfBlob) {
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.replace(/\.[^.]+$/, ".pdf");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      toast.success("PDF downloaded successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 md:py-30 lg:py-40 my-20 px-5">
      <div className="converterCard w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-600 underline">
          Word to PDF Converter
        </h2>

        <div className="flex flex-col gap-4">
          {/* File input */}
          <div className="flex flex-col justify-center">
            <label htmlFor="doc-file" className="text-xl text-orange-900 mb-2">
              Choose File:
            </label>
            <input
              id="doc-file"
              type="file"
              accept=".doc,.docx"
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
            {pdfBlob ? (
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Download PDF
              </button>
            ) : (
              <button
                onClick={handleConvert}
                className="bg-orange-700 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition duration-300"
                disabled={isConverting}
              >
                {isConverting ? "Converting..." : "Convert Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-center" delay={2000} />
    </div>
  );
};

export default WTPconvert;
