import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-white/5 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((row, rowIndex) =>
        Array.from({ length: columns }).map((col, colIndex) => {
          const index = rowIndex * columns + colIndex;
          return (
            <div
              key={`${colIndex}-${rowIndex}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-white/5"
                  : "bg-white/5 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((file, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-2xl cursor-pointer w-full relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-all duration-300"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center relative z-10">
          <p className="relative z-20 font-sans font-bold text-white text-lg">
            Beam your files
          </p>
          <p className="relative z-20 font-sans font-normal text-white/70 text-base mt-2">
            Drag and drop files here or click to select
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-xl",
                    "shadow-lg"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-white font-medium truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <div className="flex items-center gap-2">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-3 py-1 w-fit flex-shrink-0 text-sm text-white/80 bg-white/10 backdrop-blur-sm"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => handleRemoveFile(idx)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200"
                        aria-label="Remove file"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-white/60">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm"
                    >
                      {file.type || 'Unknown type'}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-xl",
                  "shadow-lg hover:bg-white/20 transition-all duration-300"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white flex flex-col items-center font-medium"
                  >
                    Drop it
                    <IconUpload className="h-6 w-6 text-white mt-1" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-6 w-6 text-white/80" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-blue-400/60 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-xl"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};