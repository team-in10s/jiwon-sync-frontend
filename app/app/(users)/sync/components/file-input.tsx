'use client';

import { useState } from 'react';
import { UseFormSetValue, UseFormRegister, FieldValues } from 'react-hook-form';

type FileInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  fieldName: keyof T;
  placeholder: string;
  selectedFileName: string | null;
  setSelectedFileName: (name: string | null) => void;
};

export default function FileInput<T extends FieldValues>({
  register,
  setValue,
  fieldName,
  placeholder,
  selectedFileName,
  setSelectedFileName,
}: FileInputProps<T>) {
  // const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
      setValue(fieldName, file); // Update the form value
    } else {
      setSelectedFileName(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue(fieldName, file); // Update the form value
    }
    setIsDragging(false);
  };

  return (
    <label
      htmlFor={fieldName}
      className={`mb-3 block w-full cursor-pointer rounded-lg border-2 border-dashed border-primary/60 ${isDragging ? 'bg-primary/10' : 'bg-[#2d2d2d]'} px-4 py-8 text-center transition duration-300 ease-in-out hover:border-primary hover:bg-primary/10`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={fieldName}
        className="hidden"
        {...register(fieldName)}
        onChange={handleFileChange}
      />
      <span>{selectedFileName || placeholder}</span>
    </label>
  );
}
