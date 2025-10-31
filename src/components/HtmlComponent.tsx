/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
import { separateWordsWithLineBreak } from '@/utils/helper';
import { useState, useRef, useEffect } from 'react';

interface HtmlComponentProps {
  textLeft: string;
  textRight: string;
  textColor: string;
  textSizeleft: number;
  textSizeRight: number;
  fontFamily: string;
  // textLeftOrientation: string;
  // textRightOrientation: string;
  textLeftRotate?: number;
  textRightRotate?: number;
  ImprintTextPosition: {
    left: {
      top: string;
      left: string;
      width: number;
      height: number;
      lineHeight: number;
      image: {
        top: string;
        left: string;
        width: number;
        height: number;
      };
    };
    right: {
      top: string;
      left: string;
      width: number;
      height: number;
      lineHeight: number;
      image: {
        top: string;
        left: string;
        width: number;
        height: number;
      };
    };
  };
  hideRightText: boolean;
  onTextLeftChange?: (text: string) => void;
  onTextRightChange?: (text: string) => void;
  onTextLeftClick?: () => void;
  onTextRightClick?: () => void;
  selectedText?: 'left' | 'right' | null;
  disableInteractions?: boolean;
}

const HtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSizeleft,
  textSizeRight,
  fontFamily,
  // textLeftOrientation,
  // textRightOrientation,
  textLeftRotate,
  textRightRotate,
  ImprintTextPosition,
  hideRightText,
  onTextLeftChange,
  onTextRightChange,
  onTextLeftClick,
  onTextRightClick,
  selectedText,
  disableInteractions = false,
}: HtmlComponentProps) => {
  const [editingLeft, setEditingLeft] = useState(false);
  const [editingRight, setEditingRight] = useState(false);
  const [tempTextLeft, setTempTextLeft] = useState(textLeft);
  const [tempTextRight, setTempTextRight] = useState(textRight);
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempTextLeft(textLeft);
  }, [textLeft]);

  useEffect(() => {
    setTempTextRight(textRight);
  }, [textRight]);

  useEffect(() => {
    if (editingLeft && leftInputRef.current) {
      leftInputRef.current.focus();
      leftInputRef.current.select();
    }
  }, [editingLeft]);

  useEffect(() => {
    if (editingRight && rightInputRef.current) {
      rightInputRef.current.focus();
      rightInputRef.current.select();
    }
  }, [editingRight]);

  const handleLeftTextClick = () => {
    // Keep inline editing behavior
    setEditingLeft(true);
    // Also trigger bottom sheet if handler provided
    if (onTextLeftClick) {
      onTextLeftClick();
    }
  };

  const handleRightTextClick = () => {
    // Keep inline editing behavior
    setEditingRight(true);
    // Also trigger bottom sheet if handler provided
    if (onTextRightClick) {
      onTextRightClick();
    }
  };

  const handleLeftTextBlur = () => {
    setEditingLeft(false);
    if (onTextLeftChange) {
      onTextLeftChange(tempTextLeft);
    }
  };

  const handleRightTextBlur = () => {
    setEditingRight(false);
    if (onTextRightChange) {
      onTextRightChange(tempTextRight);
    }
  };

  const handleLeftTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLeftTextBlur();
    } else if (e.key === 'Escape') {
      setTempTextLeft(textLeft);
      setEditingLeft(false);
    }
  };

  const handleRightTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRightTextBlur();
    } else if (e.key === 'Escape') {
      setTempTextRight(textRight);
      setEditingRight(false);
    }
  };

  return (
    <Html
      style={{
        zIndex: disableInteractions ? -1 : 0,
        pointerEvents: disableInteractions ? 'none' : 'auto',
      }}
    >
      {/* Left Text */}
      <div
        className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
        style={{
          pointerEvents: disableInteractions ? 'none' : 'auto',
          position: 'absolute',
          transform: `translate(${ImprintTextPosition?.left?.left}, ${
            ImprintTextPosition.left?.top
          }) ${textLeftRotate ? `rotate(${textLeftRotate}deg)` : ''}`,
          color: textColor,
          fontSize: textSizeleft,
          width: ImprintTextPosition?.left?.width,
          height: ImprintTextPosition?.left?.height,
          wordWrap: 'break-word',
          overflow: 'hidden',
          textTransform: 'uppercase',
          lineHeight: `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}`,
          fontFamily: fontFamily,
          // opacity: textLeft !== '' ? 1 : 0.3,
          borderRadius: '4px',
          padding: '2px',
          border:
            selectedText === 'left'
              ? '2px dashed #3B82F6'
              : textLeft === ''
              ? '2px dashed #ccc'
              : '2px solid transparent',
          boxShadow:
            selectedText === 'left'
              ? '0 0 10px rgba(59, 130, 246, 0.3)'
              : 'none',
        }}
        onClick={handleLeftTextClick}
      >
        {editingLeft ? (
          <textarea
            ref={leftInputRef as any}
            value={tempTextLeft}
            onChange={(e) => setTempTextLeft(e.target.value)}
            onBlur={handleLeftTextBlur}
            onKeyDown={handleLeftTextKeyDown}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid #3B82F6',
              borderRadius: '4px',
              padding: '4px',
              fontSize: textSizeleft,
              fontFamily: fontFamily,
              textTransform: 'uppercase',
              width: '100%',
              height: '100%',
              color: '#fff',
              resize: 'none',
              overflow: 'auto',
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              textAlign: textLeft === '' ? 'center' : 'left',
            }}
            dangerouslySetInnerHTML={{
              __html: hideRightText
                ? textLeft !== ''
                  ? textLeft
                  : 'TAP TO ADD TEXT'
                : textLeft !== ''
                ? separateWordsWithLineBreak(textLeft)
                : 'TAP TO ADD TEXT',
            }}
          />
        )}
      </div>

      {/* Right Text */}
      {!hideRightText && (
        <div
          className="overlay cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
          style={{
            pointerEvents: disableInteractions ? 'none' : 'auto',
            position: 'absolute',
            transform: `translate(${ImprintTextPosition.right.left}, ${
              ImprintTextPosition.right?.top
            }) ${textRightRotate ? `rotate(${textRightRotate}deg)` : ''}`,
            color: textColor,
            fontSize: textSizeRight,
            width: ImprintTextPosition?.right.width,
            height: ImprintTextPosition?.right.height,
            lineHeight: `${ImprintTextPosition?.right?.lineHeight || '2.8rem'}`,
            wordWrap: 'break-word',
            overflow: 'hidden',
            textTransform: 'uppercase',
            fontFamily: fontFamily,
            // opacity: textRight !== '' ? 1 : 0.3,
            zIndex: 0.8,
            borderRadius: '4px',
            padding: '2px',
            border:
              selectedText === 'right'
                ? '2px dashed #3B82F6'
                : textRight === ''
                ? '2px dashed #ccc'
                : '2px solid transparent',
            boxShadow:
              selectedText === 'right'
                ? '0 0 10px rgba(59, 130, 246, 0.3)'
                : 'none',
          }}
          onClick={handleRightTextClick}
        >
          {editingRight ? (
            <textarea
              ref={rightInputRef as any}
              value={tempTextRight}
              onChange={(e) => setTempTextRight(e.target.value)}
              onBlur={handleRightTextBlur}
              onKeyDown={handleRightTextKeyDown}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid #3B82F6',
                borderRadius: '4px',
                padding: '4px',
                fontSize: textSizeRight,
                fontFamily: fontFamily,
                textTransform: 'uppercase',
                width: '100%',
                height: '100%',
                color: '#fff',
                resize: 'none',
                overflow: 'auto',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                textAlign: textRight === '' ? 'center' : 'left',
              }}
              dangerouslySetInnerHTML={{
                __html:
                  textRight !== ''
                    ? separateWordsWithLineBreak(textRight)
                    : 'TAP TO ADD TEXT',
              }}
            />
          )}
        </div>
      )}
    </Html>
  );
};

export default HtmlComponent;
