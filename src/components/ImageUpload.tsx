/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

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
  const [activeImageTab, setActiveImageTab] = useState<'left' | 'right'>(
    'left',
  );
  const [dragOver, setDragOver] = useState<'left' | 'right' | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onImageUpload: (file: File) => void,
  ) => {
    const file = e.target.files?.[0] || null;

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

  const handleDragOver = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    setDragOver(side);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    setDragOver(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (side === 'left') {
        onImageUploadLeft(file);
      } else {
        onImageUploadRight(file);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeImageTab === 'left'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveImageTab('left')}
        >
          <i className="pi pi-image mr-2"></i>
          {labelLeft}
        </button>
        {!hideRightButton && (
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeImageTab === 'right'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveImageTab('right')}
          >
            <i className="pi pi-image mr-2"></i>
            {labelRight}
          </button>
        )}
      </div>

      {/* Upload Areas */}
      <div className="p-6">
        {/* Left Side Upload */}
        <div
          className={`transition-all duration-200 ${
            activeImageTab === 'left' ? 'block' : 'hidden'
          }`}
        >
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragOver === 'left'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={(e) => handleDragOver(e, 'left')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'left')}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <i className="pi pi-cloud-upload text-4xl text-gray-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload Image for Left Side
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop your image here, or click to browse
                </p>
              </div>
              <div className="flex justify-center">
                <label
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  htmlFor="upload-logo-left"
                >
                  <i className="pi pi-upload"></i>
                  Choose File
                </label>
                <input
                  id="upload-logo-left"
                  type="file"
                  accept="image/*"
                  onChange={handleImageLeftChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-400">
                Supports: JPG, PNG, GIF (Max 10MB)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Upload */}
        {!hideRightButton && (
          <div
            className={`transition-all duration-200 ${
              activeImageTab === 'right' ? 'block' : 'hidden'
            }`}
          >
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragOver === 'right'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={(e) => handleDragOver(e, 'right')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'right')}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <i className="pi pi-cloud-upload text-4xl text-gray-400"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Image for Right Side
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your image here, or click to browse
                  </p>
                </div>
                <div className="flex justify-center">
                  <label
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                    htmlFor="upload-logo-right"
                  >
                    <i className="pi pi-upload"></i>
                    Choose File
                  </label>
                  <input
                    id="upload-logo-right"
                    type="file"
                    accept="image/*"
                    onChange={handleImageRightChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Supports: JPG, PNG, GIF (Max 10MB)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
