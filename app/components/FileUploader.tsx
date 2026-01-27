import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utls";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const maxFileSize = 10 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxSize: maxFileSize, // 10MB
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`cursor-pointer transition-all duration-300 p-8 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center text-center group ${
            isDragActive
              ? "border-orange-500 bg-orange-50/50"
              : file
                ? "border-green-500 bg-green-50/30"
                : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-white"
          }`}
        >
          {file ? (
            <div className="flex items-center justify-between w-full animate-fade-in">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-base font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {formatSize(file.size)} • Ready to analyze
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  <span className="text-orange-500">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  PDF files up to {formatSize(maxFileSize)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
