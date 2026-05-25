import React, { useState, useEffect } from 'react';

interface RenameInputProps {
  originalName: string;
  extension: string;
  onRename: (newName: string) => void;
  className?: string;
}

export default function RenameInput({ originalName, extension, onRename, className = '' }: RenameInputProps) {
  const [value, setValue] = useState(originalName);

  useEffect(() => {
    setValue(originalName);
  }, [originalName]);

  const handleBlur = () => {
    if (value.trim()) {
      onRename(value.trim());
    } else {
      setValue(originalName);
      onRename(originalName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className={`flex items-center bg-white border border-gray-200/80 rounded-xl overflow-hidden focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all shadow-sm ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[15px] font-medium text-gray-900 placeholder:text-gray-300"
        placeholder="Rename file..."
      />
      <div className="bg-gray-50/80 border-l border-gray-200/50 px-4 py-3 text-[15px] text-gray-400 font-semibold select-none h-full border-b  border-b-transparent border-t border-t-transparent shadow-inner">
        .{extension}
      </div>
    </div>
  );
}
