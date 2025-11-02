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
  onTextLeftLongPress?: () => void;
  onTextRightLongPress?: () => void;
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
  onTextLeftLongPress,
  onTextRightLongPress,
  selectedText,
  disableInteractions = false,
}: HtmlComponentProps) => {
  const [editingLeft, setEditingLeft] = useState(false);
  const [editingRight, setEditingRight] = useState(false);
  const [tempTextLeft, setTempTextLeft] = useState(textLeft);
  const [tempTextRight, setTempTextRight] = useState(textRight);
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  // Long press detection
  const leftPressTimer = useRef<NodeJS.Timeout | null>(null);
  const rightPressTimer = useRef<NodeJS.Timeout | null>(null);
  const leftTouchStartTime = useRef<number | null>(null);
  const rightTouchStartTime = useRef<number | null>(null);
  const leftTouchHandled = useRef<boolean>(false);
  const rightTouchHandled = useRef<boolean>(false);
  const PRESS_DURATION = 500; // 500ms for long press

  useEffect(() => {
    setTempTextLeft(textLeft);
  }, [textLeft]);

  useEffect(() => {
    setTempTextRight(textRight);
  }, [textRight]);

  useEffect(() => {
    if (editingLeft && leftInputRef.current) {
      // Use setTimeout to ensure the textarea is rendered before focusing
      setTimeout(() => {
        if (leftInputRef.current) {
          leftInputRef.current.focus();
          leftInputRef.current.select();
        }
      }, 0);
    }
  }, [editingLeft]);

  useEffect(() => {
    if (editingRight && rightInputRef.current) {
      // Use setTimeout to ensure the textarea is rendered before focusing
      setTimeout(() => {
        if (rightInputRef.current) {
          rightInputRef.current.focus();
          rightInputRef.current.select();
        }
      }, 0);
    }
  }, [editingRight]);

  const handleLeftTextMouseDown = () => {
    // Start timer for long press
    leftPressTimer.current = setTimeout(() => {
      if (onTextLeftLongPress) {
        onTextLeftLongPress();
      }
      leftPressTimer.current = null;
    }, PRESS_DURATION);
  };

  const handleLeftTextClick = () => {
    // Prevent click from firing if touch was already handled
    if (leftTouchHandled.current) {
      leftTouchHandled.current = false;
      return;
    }
    // Immediate click handler - go straight to edit
    // This ensures keyboard appears on first click
    if (!editingLeft) {
      setEditingLeft(true);
      if (onTextLeftClick) {
        onTextLeftClick();
      }
    }
    // Cancel any pending long press
    if (leftPressTimer.current) {
      clearTimeout(leftPressTimer.current);
      leftPressTimer.current = null;
    }
  };

  const handleLeftTextMouseUp = () => {
    // Cancel long press timer
    if (leftPressTimer.current) {
      clearTimeout(leftPressTimer.current);
      leftPressTimer.current = null;
    }
  };

  const handleLeftTextMouseLeave = () => {
    // Cancel timer if mouse leaves
    if (leftPressTimer.current) {
      clearTimeout(leftPressTimer.current);
      leftPressTimer.current = null;
    }
  };

  const handleLeftTextTouchStart = (e: React.TouchEvent) => {
    leftTouchStartTime.current = Date.now();
    leftTouchHandled.current = false;
    // Start timer for long press on touch
    leftPressTimer.current = setTimeout(() => {
      if (onTextLeftLongPress) {
        e.preventDefault(); // Prevent click event
        onTextLeftLongPress();
        leftTouchHandled.current = true;
      }
      leftPressTimer.current = null;
    }, PRESS_DURATION);
  };

  const handleLeftTextTouchEnd = (e: React.TouchEvent) => {
    const touchDuration = leftTouchStartTime.current
      ? Date.now() - leftTouchStartTime.current
      : 0;

    // Cancel long press timer
    if (leftPressTimer.current) {
      clearTimeout(leftPressTimer.current);
      leftPressTimer.current = null;
    }

    // If it was a short tap (not long press), enter edit mode immediately
    if (touchDuration < PRESS_DURATION && !leftTouchHandled.current) {
      if (!editingLeft) {
        leftTouchHandled.current = true;
        setEditingLeft(true);
        if (onTextLeftClick) {
          onTextLeftClick();
        }
        // Prevent click event from firing
        e.preventDefault();
      }
    }

    leftTouchStartTime.current = null;
  };

  const handleRightTextMouseDown = () => {
    // Start timer for long press
    rightPressTimer.current = setTimeout(() => {
      if (onTextRightLongPress) {
        onTextRightLongPress();
      }
      rightPressTimer.current = null;
    }, PRESS_DURATION);
  };

  const handleRightTextClick = () => {
    // Prevent click from firing if touch was already handled
    if (rightTouchHandled.current) {
      rightTouchHandled.current = false;
      return;
    }
    // Immediate click handler - go straight to edit
    // This ensures keyboard appears on first click
    if (!editingRight) {
      setEditingRight(true);
      if (onTextRightClick) {
        onTextRightClick();
      }
    }
    // Cancel any pending long press
    if (rightPressTimer.current) {
      clearTimeout(rightPressTimer.current);
      rightPressTimer.current = null;
    }
  };

  const handleRightTextMouseUp = () => {
    // Cancel long press timer
    if (rightPressTimer.current) {
      clearTimeout(rightPressTimer.current);
      rightPressTimer.current = null;
    }
  };

  const handleRightTextMouseLeave = () => {
    // Cancel timer if mouse leaves
    if (rightPressTimer.current) {
      clearTimeout(rightPressTimer.current);
      rightPressTimer.current = null;
    }
  };

  const handleRightTextTouchStart = (e: React.TouchEvent) => {
    rightTouchStartTime.current = Date.now();
    rightTouchHandled.current = false;
    // Start timer for long press on touch
    rightPressTimer.current = setTimeout(() => {
      if (onTextRightLongPress) {
        e.preventDefault(); // Prevent click event
        onTextRightLongPress();
        rightTouchHandled.current = true;
      }
      rightPressTimer.current = null;
    }, PRESS_DURATION);
  };

  const handleRightTextTouchEnd = (e: React.TouchEvent) => {
    const touchDuration = rightTouchStartTime.current
      ? Date.now() - rightTouchStartTime.current
      : 0;

    // Cancel long press timer
    if (rightPressTimer.current) {
      clearTimeout(rightPressTimer.current);
      rightPressTimer.current = null;
    }

    // If it was a short tap (not long press), enter edit mode immediately
    if (touchDuration < PRESS_DURATION && !rightTouchHandled.current) {
      if (!editingRight) {
        rightTouchHandled.current = true;
        setEditingRight(true);
        if (onTextRightClick) {
          onTextRightClick();
        }
        // Prevent click event from firing
        e.preventDefault();
      }
    }

    rightTouchStartTime.current = null;
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (leftPressTimer.current) {
        clearTimeout(leftPressTimer.current);
      }
      if (rightPressTimer.current) {
        clearTimeout(rightPressTimer.current);
      }
    };
  }, []);

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
    // Enter key now creates a new line (default textarea behavior)
    // Only handle Escape to cancel editing
    if (e.key === 'Escape') {
      setTempTextLeft(textLeft);
      setEditingLeft(false);
    }
  };

  const handleRightTextKeyDown = (e: React.KeyboardEvent) => {
    // Enter key now creates a new line (default textarea behavior)
    // Only handle Escape to cancel editing
    if (e.key === 'Escape') {
      setTempTextRight(textRight);
      setEditingRight(false);
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
          opacity: disableInteractions ? 0 : textLeft !== '' ? 1 : 1,
          visibility: disableInteractions ? 'hidden' : 'visible',
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
        onMouseDown={handleLeftTextMouseDown}
        onMouseUp={handleLeftTextMouseUp}
        onMouseLeave={handleLeftTextMouseLeave}
        onTouchStart={handleLeftTextTouchStart}
        onTouchEnd={handleLeftTextTouchEnd}
      >
        {editingLeft ? (
          <textarea
            ref={leftInputRef as any}
            value={tempTextLeft}
            onChange={(e) => setTempTextLeft(e.target.value)}
            onBlur={handleLeftTextBlur}
            onKeyDown={handleLeftTextKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              borderRadius: '4px',
              padding: '2px',
              fontSize: textSizeleft,
              fontFamily: fontFamily,
              textTransform: 'uppercase',
              width: '100%',
              height: '100%',
              color: textColor,
              resize: 'none',
              overflow: 'auto',
              lineHeight: `${
                ImprintTextPosition?.left?.lineHeight || '2.8rem'
              }`,
              textAlign: textLeft === '' ? 'center' : 'left',
              display: 'flex',
              alignItems: 'center',
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
            opacity: disableInteractions ? 0 : textRight !== '' ? 1 : 1,
            visibility: disableInteractions ? 'hidden' : 'visible',
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
          onMouseDown={handleRightTextMouseDown}
          onMouseUp={handleRightTextMouseUp}
          onMouseLeave={handleRightTextMouseLeave}
          onTouchStart={handleRightTextTouchStart}
          onTouchEnd={handleRightTextTouchEnd}
        >
          {editingRight ? (
            <textarea
              ref={rightInputRef as any}
              value={tempTextRight}
              onChange={(e) => setTempTextRight(e.target.value)}
              onBlur={handleRightTextBlur}
              onKeyDown={handleRightTextKeyDown}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                borderRadius: '4px',
                padding: '2px',
                fontSize: textSizeRight,
                fontFamily: fontFamily,
                textTransform: 'uppercase',
                width: '100%',
                height: '100%',
                color: textColor,
                resize: 'none',
                overflow: 'auto',
                lineHeight: `${
                  ImprintTextPosition?.right?.lineHeight || '2.8rem'
                }`,
                textAlign: textRight === '' ? 'center' : 'left',
                display: 'flex',
                alignItems: 'center',
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
