/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
// import { separateWordsWithLineBreak } from '@/utils/helper';
import { useRef } from 'react';

const HtmlImageComponent = ({
  ImprintTextPosition,
  hideRightText,
  imageLeft,
  imageRight,
  hideLogo = false,
  textColor,
  onImageLeftChange,
  onImageRightChange,
  disableInteractions = false,
}: {
  ImprintTextPosition: any;
  hideRightText: boolean;
  imageLeft: string | null;
  imageRight: string;
  hideLogo: boolean;
  textColor: string;
  onImageLeftChange?: (file: File) => void;
  onImageRightChange?: (file: File) => void;
  disableInteractions?: boolean;
}) => {
  const isMobile = window.innerWidth < 768;
  const leftFileInputRef = useRef<HTMLInputElement>(null);
  const rightFileInputRef = useRef<HTMLInputElement>(null);

  const handleLeftImageClick = () => {
    if (leftFileInputRef.current) {
      leftFileInputRef.current.click();
    }
  };

  const handleRightImageClick = () => {
    if (rightFileInputRef.current) {
      rightFileInputRef.current.click();
    }
  };

  const handleLeftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageLeftChange) {
      onImageLeftChange(file);
    }
  };

  const handleRightFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageRightChange) {
      onImageRightChange(file);
    }
  };

  return (
    <Html
      className={disableInteractions ? 'html-disabled' : ''}
      style={{
        zIndex: disableInteractions ? -1 : 0,
        pointerEvents: disableInteractions ? 'none' : 'auto',
      }}
    >
      {!hideLogo && (
        <div
          className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
          style={{
            pointerEvents: disableInteractions ? 'none' : 'auto',
            position: 'absolute',
            transform: `translate(${ImprintTextPosition.left?.image?.left}, ${ImprintTextPosition.left?.image?.top})`,
            fontSize: '0.5rem',
            lineHeight: '0.7rem',
            scale: isMobile ? 1 : 2,
            width:
              imageLeft !== null
                ? ImprintTextPosition?.left?.image?.width
                : '2rem',
            height:
              imageLeft !== null
                ? ImprintTextPosition?.left.image?.height
                : '2rem',
            wordWrap: 'break-word',
            overflow: 'hidden',
            textTransform: 'uppercase',
            backgroundImage: `url(${imageLeft})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: disableInteractions ? 0 : imageLeft !== null ? 1 : 1,
            visibility: disableInteractions ? 'hidden' : 'visible',
            color: textColor,
            borderRadius: '4px',
            border: imageLeft ? '2px solid transparent' : '2px dashed #ccc',
            padding: '2px',
          }}
          onClick={handleLeftImageClick}
          title="Click to upload image"
        >
          {!imageLeft && (
            <div
              className="flex items-center justify-center h-full text-white text-xs"
              style={{
                fontSize: '0.5rem',
                lineHeight: '0.8rem',
              }}
            >
              <div className="text-center">
                {/* <div className="mb-1">📷</div> */}
                <div>TAP TO</div>
                <div>UPLOAD</div>
                <div>LOGO</div>
              </div>
            </div>
          )}

          <input
            ref={leftFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLeftFileChange}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {!hideRightText && (
        <div
          className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
          style={{
            pointerEvents: disableInteractions ? 'none' : 'auto',
            position: 'absolute',
            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image?.top})`,
            fontSize: '0.5rem',
            lineHeight: '0.7rem',
            scale: isMobile ? 1 : 5,
            width:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.width
                : '2rem',
            height:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.height
                : '2rem',
            wordWrap: 'break-word',
            overflow: 'hidden',
            textTransform: 'uppercase',
            backgroundImage: `url(${imageRight})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: disableInteractions ? 0 : imageRight !== null ? 1 : 1,
            visibility: disableInteractions ? 'hidden' : 'visible',
            color: textColor,
            borderRadius: '4px',
            border: imageRight ? '2px solid transparent' : '2px dashed #ccc',
            padding: '2px',
          }}
          onClick={handleRightImageClick}
          title="Click to upload image"
        >
          {!imageRight && (
            <div
              className="flex items-center justify-center h-full text-white text-xs"
              style={{
                fontSize: '0.5rem',
                lineHeight: '0.8rem',
              }}
            >
              <div className="text-center">
                {/* <div className="mb-1">📷</div> */}
                <div>TAP TO</div>
                <div>UPLOAD</div>
                <div>LOGO</div>
              </div>
            </div>
          )}

          <input
            ref={rightFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleRightFileChange}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </Html>
  );
};

export default HtmlImageComponent;
