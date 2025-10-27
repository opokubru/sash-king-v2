/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
// import { separateWordsWithLineBreak } from '@/utils/helper';
import { useEffect, useState, useRef } from 'react';

const HtmlLogoComponent = ({
  // ImprintTextPosition,
  // hideRightText,
  imageLeft,
  turn_to_back,
  imageRight,
  width,
  height,
  translateY,
  translateX,
  onImageLeftChange,
  onImageRightChange,
}: {
  ImprintTextPosition: any;
  hideRightText: boolean;
  imageLeft: string;
  turn_to_back: boolean;
  imageRight: string;
  width: number;
  height: number;
  translateY: number;
  translateX: number;
  onImageLeftChange?: (file: File) => void;
  onImageRightChange?: (file: File) => void;
}) => {
  const [stableImageLeft, setStableImageLeft] = useState('');
  // const [editingImage, setEditingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStableImageLeft('');

    /// timetout 5 secons and set the image
    setTimeout(() => {
      if (turn_to_back) {
        setStableImageLeft(imageRight);
      } else {
        setStableImageLeft(imageLeft);
      }
    }, 1000);
  }, [turn_to_back]);

  useEffect(() => {
    if (turn_to_back) {
      setStableImageLeft(imageRight);
    } else {
      setStableImageLeft(imageLeft);
    }
  }, [imageLeft, imageRight]);

  const handleImageClick = () => {
    // setEditingImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (turn_to_back && onImageRightChange) {
        onImageRightChange(file);
      } else if (!turn_to_back && onImageLeftChange) {
        onImageLeftChange(file);
      }
    }
    // setEditingImage(false);
  };

  return (
    <Html style={{ zIndex: 1 }}>
      <div
        className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
        style={{
          position: 'absolute',
          transform: `translate(${translateX}, ${translateY})`,
          fontSize: '0.5rem',
          lineHeight: '0.7rem',
          width: width,
          height: height,
          wordWrap: 'break-word',
          overflow: 'hidden',
          textTransform: 'uppercase',
          backgroundImage: `url(${stableImageLeft})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // opacity: stableImageLeft !== null ? 1 : 0.3,
          borderRadius: '4px',
          border: stableImageLeft ? '2px solid transparent' : '2px dashed #ccc',
          padding: '2px',
        }}
        onClick={handleImageClick}
        title="Click to upload image"
      >
        {!stableImageLeft && (
          <div
            className="flex items-center justify-center h-full text-gray-500 text-xs"
            style={{
              fontSize: '0.4rem',
              lineHeight: '0.6rem',
            }}
          >
            <div className="text-center">
              <div className="mb-1">📷</div>
              <div>CLICK TO</div>
              <div>UPLOAD</div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image?.top})`,
            fontSize: "0.5rem",
            lineHeight: "0.7rem",
            width:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.width
                : "2rem",
            height:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.height
                : "2rem",
            wordWrap: "break-word", // Enable word wrapping for long words
            overflow: "hidden", // Ensure text doesn't overflow its container
            textTransform: "uppercase",

            backgroundImage: `url(${imageRight})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: imageRight !== null ? 1 : 0.3,
          }}
          dangerouslySetInnerHTML={{
            __html:
              imageRight !== null
                ? ""
                : separateWordsWithLineBreak("LOGO HERE"),
          }}
        />
      )} */}
    </Html>
  );
};

export default HtmlLogoComponent;
