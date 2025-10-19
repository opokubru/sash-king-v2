/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const ImageUpload = ({
  labelLeft,
  labelRight,
  onImageUploadLeft,
  onImageUploadRight,
  // toastRef,
  hideRightButton,
}: {
  labelLeft: string;
  labelRight: string;
  onImageUploadLeft: (file: File) => void;
  onImageUploadRight: (file: File) => void;
  toastRef: any;
  hideRightButton: boolean;
}) => {
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onImageUpload: (file: File) => void,
  ) => {
    const file = e.target.files?.[0] || null;

    // Check if file type is PNG
    // if (!file.type.includes("png")) {
    //   toastRef.current.show({
    //     severity: "error",
    //     summary: "Cannot continue",
    //     detail: "Only png images accepted",
    //   });
    //   e.target.value = null;
    //   return;
    // }

    // // Create an image element to get the dimensions
    // const img = new Image();
    // img.src = URL.createObjectURL(file);

    // img.onload = () => {
    //   // Check if the image dimensions are 500x500
    //   if (img.width !== 500 || img.height !== 500) {
    //     alert("Please upload an image with dimensions 500x500.");
    //     e.target.value = null;
    //     return;
    //   } else {
    //     onImageUpload(file); // Pass the uploaded file to the parent component
    //   }
    // };

    // Pass the uploaded file to the parent component without dimension check
    if (file) {
      onImageUpload(file);
    }
  };

  const handleImageLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e, onImageUploadLeft);
  };

  const handleImageRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e, onImageUploadRight);
  };

  return (
    <div className="flex justify-center items-center gap-4  w-full">
      <label
        className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md"
        htmlFor="upload-logo-left"
      >
        {labelLeft}
      </label>
      <input
        id="upload-logo-left"
        type="file"
        onChange={handleImageLeftChange}
        className="upload-input"
      />
      {!hideRightButton && (
        <>
          <label
            className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md"
            htmlFor="upload-logo-right"
          >
            {labelRight}
          </label>
          <input
            id="upload-logo-right"
            type="file"
            onChange={handleImageRightChange}
            className="upload-input"
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;
