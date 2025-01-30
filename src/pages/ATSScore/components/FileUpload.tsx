import React from 'react';
import { FileUp } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ file, onFileChange }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      onFileChange(selectedFile);
    } else {
      onFileChange(null);
      alert('Please upload a PDF file');
    }
  };

  return (
    <div className="mb-6 animate-fade-in">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-2">
        Upload Resume (PDF)
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 
          border-2 border-primary/20 border-dashed rounded-xl cursor-pointer 
          glass-panel transition-all duration-300 hover:border-primary/40 
          hover:shadow-lg hover:shadow-primary/5">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-2 rounded-lg bg-primary/10 mb-2 transition-transform duration-300 group-hover:scale-110">
              <FileUp className="w-8 h-8 text-primary" />
            </div>
            {file ? (
              <p className="text-sm text-primary font-medium">{file.name}</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500/80">PDF files only</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
