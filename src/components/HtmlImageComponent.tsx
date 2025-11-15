/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
// import { separateWordsWithLineBreak } from '@/utils/helper';
import { useRef, useState, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

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
  enableDragging = false,
  onPositionChange,
  customPositions,
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
  enableDragging?: boolean;
  onPositionChange?: (
    side: 'left' | 'right',
    position: { x: number; y: number },
  ) => void;
  customPositions?: {
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  };
}) => {
  const [leftImagePosition, setLeftImagePosition] = useState({ x: 0, y: 0 });
  const [rightImagePosition, setRightImagePosition] = useState({ x: 0, y: 0 });
  const isMobile = window.innerWidth < 768;
  const leftFileInputRef = useRef<HTMLInputElement>(null);
  const rightFileInputRef = useRef<HTMLInputElement>(null);
  const leftImageDragStarted = useRef(false);
  const rightImageDragStarted = useRef(false);
  const leftImageDragStartPosition = useRef({ x: 0, y: 0 });
  const rightImageDragStartPosition = useRef({ x: 0, y: 0 });

  const handleLeftImageClick = () => {
    // If drag started, don't handle click
    if (leftImageDragStarted.current) {
      leftImageDragStarted.current = false;
      return;
    }
    if (leftFileInputRef.current) {
      leftFileInputRef.current.click();
    }
  };

  const handleRightImageClick = () => {
    // If drag started, don't handle click
    if (rightImageDragStarted.current) {
      rightImageDragStarted.current = false;
      return;
    }
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

  // Initialize image positions
  useEffect(() => {
    if (customPositions?.left) {
      setLeftImagePosition(customPositions.left);
    } else {
      const left = parseInt(ImprintTextPosition.left?.image?.left) || 0;
      const top = parseInt(ImprintTextPosition.left?.image?.top) || 0;
      setLeftImagePosition({ x: left, y: top });
    }

    if (customPositions?.right) {
      setRightImagePosition(customPositions.right);
    } else {
      const left = parseInt(ImprintTextPosition.right?.image?.left) || 0;
      const top = parseInt(ImprintTextPosition.right?.image?.top) || 0;
      setRightImagePosition({ x: left, y: top });
    }
  }, [customPositions, ImprintTextPosition]);

  const handleLeftImageDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    // Check if there was actual movement (more than 5px)
    const moved =
      Math.abs(data.x - leftImageDragStartPosition.current.x) > 5 ||
      Math.abs(data.y - leftImageDragStartPosition.current.y) > 5;

    if (moved) {
      setLeftImagePosition(newPosition);
      if (onPositionChange) {
        onPositionChange('left', newPosition);
      }
    } else {
      // It was just a click, not a drag
      leftImageDragStarted.current = false;
    }
  };

  const handleRightImageDragStop = (
    _e: DraggableEvent,
    data: DraggableData,
  ) => {
    const newPosition = { x: data.x, y: data.y };
    // Check if there was actual movement (more than 5px)
    const moved =
      Math.abs(data.x - rightImageDragStartPosition.current.x) > 5 ||
      Math.abs(data.y - rightImageDragStartPosition.current.y) > 5;

    if (moved) {
      setRightImagePosition(newPosition);
      if (onPositionChange) {
        onPositionChange('right', newPosition);
      }
    } else {
      // It was just a click, not a drag
      rightImageDragStarted.current = false;
    }
  };

  return (
    <Html
      className={disableInteractions ? 'html-disabled' : ''}
      style={{
        zIndex: disableInteractions ? -1 : 1,
        pointerEvents: disableInteractions ? 'none' : 'auto',
        position: 'relative',
      }}
    >
      {!hideLogo && (
        <>
          {enableDragging && !disableInteractions ? (
            <Draggable
              position={leftImagePosition}
              onStart={(_e, data) => {
                leftImageDragStartPosition.current = { x: data.x, y: data.y };
                leftImageDragStarted.current = true;
              }}
              onStop={(e, data) => {
                handleLeftImageDragStop(e, data);
                leftImageDragStarted.current = false;
              }}
            >
              <div
                className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
                style={{
                  pointerEvents: disableInteractions ? 'none' : 'auto',
                  position: 'absolute',
                  transform: '',
                  fontSize: '0.5rem',
                  lineHeight: '0.7rem',
                  scale: isMobile ? 1 : 2,
                  width: ImprintTextPosition?.left?.image?.width || '3.5rem',
                  height: ImprintTextPosition?.left?.image?.height || '3.5rem',
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
                  border: imageLeft
                    ? '2px solid transparent'
                    : '2px dashed #ccc',
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
            </Draggable>
          ) : (
            <div
              className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
              style={{
                pointerEvents: disableInteractions ? 'none' : 'auto',
                position: 'absolute',
                transform: `translate(${ImprintTextPosition.left?.image?.left}, ${ImprintTextPosition.left?.image?.top})`,
                fontSize: '0.5rem',
                lineHeight: '0.7rem',
                scale: isMobile ? 1 : 2,
                width: ImprintTextPosition?.left?.image?.width || '3.5rem',
                height: ImprintTextPosition?.left?.image?.height || '3.5rem',
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
        </>
      )}

      {!hideRightText && (
        <>
          {enableDragging && !disableInteractions ? (
            <Draggable
              position={rightImagePosition}
              onStart={(_e, data) => {
                rightImageDragStartPosition.current = { x: data.x, y: data.y };
                rightImageDragStarted.current = true;
              }}
              onStop={(e, data) => {
                handleRightImageDragStop(e, data);
                rightImageDragStarted.current = false;
              }}
            >
              <div
                className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
                style={{
                  pointerEvents: disableInteractions ? 'none' : 'auto',
                  position: 'absolute',
                  transform: '',
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
                  opacity: disableInteractions
                    ? 0
                    : imageRight !== null
                    ? 1
                    : 1,
                  visibility: disableInteractions ? 'hidden' : 'visible',
                  color: textColor,
                  borderRadius: '4px',
                  border: imageRight
                    ? '2px solid transparent'
                    : '2px dashed #ccc',
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
            </Draggable>
          ) : (
            <div
              className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
              style={{
                pointerEvents: disableInteractions ? 'none' : 'auto',
                position: 'absolute',
                transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image?.top})`,
                fontSize: '0.5rem',
                lineHeight: '0.7rem',
                scale: isMobile ? 1 : 5,
                width: ImprintTextPosition?.right?.image?.width || '3.5rem',
                height: ImprintTextPosition?.right?.image?.height || '3.5rem',
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
                border: imageRight
                  ? '2px solid transparent'
                  : '2px dashed #ccc',
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
        </>
      )}
    </Html>
  );
};

export default HtmlImageComponent;
