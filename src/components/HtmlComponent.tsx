/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  // Helper function to wrap text at 7 characters per line
  const wrapTextAt7Chars = (text: string): string => {
    const lines: string[] = [];
    const currentLines = text.split('\n');

    for (const line of currentLines) {
      let remaining = line;

      while (remaining.length > 0) {
        if (remaining.length <= 7) {
          lines.push(remaining);
          break;
        }

        // Try to break at word boundary first (space within first 7 chars)
        const first7Chars = remaining.substring(0, 7);
        const lastSpaceIndex = first7Chars.lastIndexOf(' ');

        let breakPoint = 7;
        if (lastSpaceIndex > 0) {
          // Break after the space
          breakPoint = lastSpaceIndex + 1;
        }

        lines.push(remaining.substring(0, breakPoint));
        // Trim leading spaces from next line
        remaining = remaining.substring(breakPoint).replace(/^\s+/, '');
      }
    }

    return lines.join('\n');
  };

  // Helper function to convert wrapped text (with \n) to HTML (with <br>)
  const wrapTextToHtml = (text: string): string => {
    const wrappedText = wrapTextAt7Chars(text);
    return wrappedText.split('\n').join('<br>');
  };

  // Helper function to get current line count
  const getLineCount = (text: string): number => {
    return text.split('\n').length;
  };

  const handleLeftTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    // Don't wrap while typing - just check line count to prevent exceeding 3 lines
    // Wrapping will be applied when displaying (escaped mode) or on blur
    const lineCount = getLineCount(newText);
    if (lineCount > 3) {
      // Prevent typing and show toast notification
      toast.error('Maximum 3 lines allowed', {
        duration: 2000,
        position: 'top-center',
      });
      return; // Don't update the text
    }

    setTempTextLeft(newText);
  };

  const handleRightTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    // Don't wrap while typing - just check line count to prevent exceeding 3 lines
    // Wrapping will be applied when displaying (escaped mode) or on blur
    const lineCount = getLineCount(newText);
    if (lineCount > 3) {
      // Prevent typing and show toast notification
      toast.error('Maximum 3 lines allowed', {
        duration: 2000,
        position: 'top-center',
      });
      return; // Don't update the text
    }

    setTempTextRight(newText);
  };

  const handleLeftTextBlur = () => {
    setEditingLeft(false);
    if (onTextLeftChange) {
      // Apply wrapping when saving the text
      const wrappedText = wrapTextAt7Chars(tempTextLeft);
      onTextLeftChange(wrappedText);
    }
  };

  const handleRightTextBlur = () => {
    setEditingRight(false);
    if (onTextRightChange) {
      // Apply wrapping when saving the text
      const wrappedText = wrapTextAt7Chars(tempTextRight);
      onTextRightChange(wrappedText);
    }
  };

  const handleLeftTextKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    // Handle Enter key - allow manual line breaks
    if (e.key === 'Enter') {
      // Use the actual textarea value (not state) to get current text
      const textarea = e.currentTarget;
      const currentValue = textarea.value;
      const currentLineCount = getLineCount(currentValue);

      // Prevent Enter if it would exceed 3 lines
      if (currentLineCount >= 3) {
        e.preventDefault();
        toast.error('Maximum 3 lines allowed', {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
      // Otherwise, let Enter work naturally - it will insert \n
    }
    // Escape to cancel editing
    if (e.key === 'Escape') {
      setTempTextLeft(textLeft);
      setEditingLeft(false);
    }
  };

  const handleRightTextKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    // Handle Enter key - allow manual line breaks
    if (e.key === 'Enter') {
      // Use the actual textarea value (not state) to get current text
      const textarea = e.currentTarget;
      const currentValue = textarea.value;
      const currentLineCount = getLineCount(currentValue);

      // Prevent Enter if it would exceed 3 lines
      if (currentLineCount >= 3) {
        e.preventDefault();
        toast.error('Maximum 3 lines allowed', {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
      // Otherwise, let Enter work naturally - it will insert \n
    }
    // Escape to cancel editing
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
            onChange={handleLeftTextChange}
            onBlur={handleLeftTextBlur}
            onKeyDown={handleLeftTextKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              borderRadius: '4px',
              padding: '0',
              margin: '0',
              fontSize: textSizeleft,
              fontFamily: fontFamily,
              textTransform: 'uppercase',
              width: '100%',
              height: '100%',
              color: textColor,
              resize: 'none',
              overflow: 'hidden',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'pre-wrap',
              lineHeight: `${
                ImprintTextPosition?.left?.lineHeight || '2.8rem'
              }`,
              textAlign: textLeft === '' ? 'center' : 'left',
              display: 'block',
              boxSizing: 'border-box',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              textAlign: textLeft === '' ? 'center' : 'left',
              lineHeight: `${
                ImprintTextPosition?.left?.lineHeight || '2.8rem'
              }`,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'pre-wrap',
              display: 'block',
            }}
            dangerouslySetInnerHTML={{
              __html: hideRightText
                ? textLeft !== ''
                  ? wrapTextToHtml(textLeft)
                  : 'TAP TO ADD TEXT'
                : textLeft !== ''
                ? wrapTextToHtml(textLeft)
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
              onChange={handleRightTextChange}
              onBlur={handleRightTextBlur}
              onKeyDown={handleRightTextKeyDown}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                borderRadius: '4px',
                padding: '0',
                margin: '0',
                fontSize: textSizeRight,
                fontFamily: fontFamily,
                textTransform: 'uppercase',
                width: '100%',
                height: '100%',
                color: textColor,
                resize: 'none',
                overflow: 'hidden',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'pre-wrap',
                lineHeight: `${
                  ImprintTextPosition?.right?.lineHeight || '2.8rem'
                }`,
                textAlign: textRight === '' ? 'center' : 'left',
                display: 'block',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                textAlign: textRight === '' ? 'center' : 'left',
                lineHeight: `${
                  ImprintTextPosition?.right?.lineHeight || '2.8rem'
                }`,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'pre-wrap',
                display: 'block',
              }}
              dangerouslySetInnerHTML={{
                __html:
                  textRight !== ''
                    ? wrapTextToHtml(textRight)
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
