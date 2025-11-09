/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
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
  // Advanced styling props
  textBold?: boolean;
  textItalic?: boolean;
  textUnderline?: boolean;
  textAlignment?: 'left' | 'center' | 'right' | 'justify';
  letterSpacing?: number;
  customLineHeight?: number;
  // Dragging props
  enableDragging?: boolean;
  onPositionChange?: (side: 'left' | 'right', position: { x: number; y: number }) => void;
  customPositions?: {
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  };
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
  textBold = false,
  textItalic = false,
  textUnderline = false,
  textAlignment = 'left',
  letterSpacing = 0,
  customLineHeight,
  enableDragging = false,
  onPositionChange,
  customPositions,
}: HtmlComponentProps) => {
  const [leftDragPosition, setLeftDragPosition] = useState({ x: 0, y: 0 });
  const [rightDragPosition, setRightDragPosition] = useState({ x: 0, y: 0 });
  const [editingLeft, setEditingLeft] = useState(false);
  const [editingRight, setEditingRight] = useState(false);
  const [tempTextLeft, setTempTextLeft] = useState(textLeft);
  const [tempTextRight, setTempTextRight] = useState(textRight);
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  // Double tap detection
  const leftLastTapTime = useRef<number>(0);
  const rightLastTapTime = useRef<number>(0);
  const leftTapTimeout = useRef<NodeJS.Timeout | null>(null);
  const rightTapTimeout = useRef<NodeJS.Timeout | null>(null);
  const DOUBLE_TAP_DELAY = 300; // 300ms window for double tap

  useEffect(() => {
    setTempTextLeft(textLeft);
  }, [textLeft]);

  useEffect(() => {
    setTempTextRight(textRight);
  }, [textRight]);

  // Initialize drag positions
  useEffect(() => {
    if (customPositions?.left) {
      setLeftDragPosition(customPositions.left);
    } else {
      const left = parseInt(ImprintTextPosition.left.left) || 0;
      const top = parseInt(ImprintTextPosition.left.top) || 0;
      setLeftDragPosition({ x: left, y: top });
    }

    if (customPositions?.right) {
      setRightDragPosition(customPositions.right);
    } else {
      const left = parseInt(ImprintTextPosition.right.left) || 0;
      const top = parseInt(ImprintTextPosition.right.top) || 0;
      setRightDragPosition({ x: left, y: top });
    }
  }, [customPositions, ImprintTextPosition]);

  const handleLeftDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    setLeftDragPosition(newPosition);
    if (onPositionChange) {
      onPositionChange('left', newPosition);
    }
  };

  const handleRightDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    setRightDragPosition(newPosition);
    if (onPositionChange) {
      onPositionChange('right', newPosition);
    }
  };

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

  const handleLeftTextClick = () => {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - leftLastTapTime.current;

    // Clear any pending single tap timeout
    if (leftTapTimeout.current) {
      clearTimeout(leftTapTimeout.current);
      leftTapTimeout.current = null;
    }

    if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected - show bottom sheet
      if (onTextLeftLongPress) {
        onTextLeftLongPress();
      }
      leftLastTapTime.current = 0; // Reset to prevent triple tap
    } else {
      // Single tap - set up timeout to handle if no second tap
      leftLastTapTime.current = currentTime;
      leftTapTimeout.current = setTimeout(() => {
        // Single tap - enter inline edit mode
        if (!editingLeft) {
          setEditingLeft(true);
          if (onTextLeftClick) {
            onTextLeftClick();
          }
        }
        leftTapTimeout.current = null;
        leftLastTapTime.current = 0;
      }, DOUBLE_TAP_DELAY);
    }
  };

  const handleLeftTextMouseDown = () => {
    // No-op for double tap (handled in click)
  };

  const handleLeftTextMouseUp = () => {
    // No-op for double tap
  };

  const handleLeftTextMouseLeave = () => {
    // Cancel single tap timeout if mouse leaves
    if (leftTapTimeout.current) {
      clearTimeout(leftTapTimeout.current);
      leftTapTimeout.current = null;
    }
  };

  const handleLeftTextTouchStart = () => {
    // No-op for double tap
  };

  const handleLeftTextTouchEnd = (e: React.TouchEvent) => {
    // Use the same double tap logic for touch
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - leftLastTapTime.current;

    if (leftTapTimeout.current) {
      clearTimeout(leftTapTimeout.current);
      leftTapTimeout.current = null;
    }

    if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      e.preventDefault();
      if (onTextLeftLongPress) {
        onTextLeftLongPress();
      }
      leftLastTapTime.current = 0;
    } else {
      // Single tap
      leftLastTapTime.current = currentTime;
      leftTapTimeout.current = setTimeout(() => {
        if (!editingLeft) {
          setEditingLeft(true);
          if (onTextLeftClick) {
            onTextLeftClick();
          }
        }
        leftTapTimeout.current = null;
        leftLastTapTime.current = 0;
      }, DOUBLE_TAP_DELAY);
    }
  };

  const handleRightTextClick = () => {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - rightLastTapTime.current;

    // Clear any pending single tap timeout
    if (rightTapTimeout.current) {
      clearTimeout(rightTapTimeout.current);
      rightTapTimeout.current = null;
    }

    if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected - show bottom sheet
      if (onTextRightLongPress) {
        onTextRightLongPress();
      }
      rightLastTapTime.current = 0; // Reset to prevent triple tap
    } else {
      // Single tap - set up timeout to handle if no second tap
      rightLastTapTime.current = currentTime;
      rightTapTimeout.current = setTimeout(() => {
        // Single tap - enter inline edit mode
        if (!editingRight) {
          setEditingRight(true);
          if (onTextRightClick) {
            onTextRightClick();
          }
        }
        rightTapTimeout.current = null;
        rightLastTapTime.current = 0;
      }, DOUBLE_TAP_DELAY);
    }
  };

  const handleRightTextMouseDown = () => {
    // No-op for double tap (handled in click)
  };

  const handleRightTextMouseUp = () => {
    // No-op for double tap
  };

  const handleRightTextMouseLeave = () => {
    // Cancel single tap timeout if mouse leaves
    if (rightTapTimeout.current) {
      clearTimeout(rightTapTimeout.current);
      rightTapTimeout.current = null;
    }
  };

  const handleRightTextTouchStart = () => {
    // No-op for double tap
  };

  const handleRightTextTouchEnd = (e: React.TouchEvent) => {
    // Use the same double tap logic for touch
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - rightLastTapTime.current;

    if (rightTapTimeout.current) {
      clearTimeout(rightTapTimeout.current);
      rightTapTimeout.current = null;
    }

    if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      e.preventDefault();
      if (onTextRightLongPress) {
        onTextRightLongPress();
      }
      rightLastTapTime.current = 0;
    } else {
      // Single tap
      rightLastTapTime.current = currentTime;
      rightTapTimeout.current = setTimeout(() => {
        if (!editingRight) {
          setEditingRight(true);
          if (onTextRightClick) {
            onTextRightClick();
          }
        }
        rightTapTimeout.current = null;
        rightLastTapTime.current = 0;
      }, DOUBLE_TAP_DELAY);
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (leftTapTimeout.current) {
        clearTimeout(leftTapTimeout.current);
      }
      if (rightTapTimeout.current) {
        clearTimeout(rightTapTimeout.current);
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
      {enableDragging && !disableInteractions ? (
        <Draggable
          position={leftDragPosition}
          onStop={handleLeftDragStop}
          disabled={editingLeft}
        >
          <div
            className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
              style={{
                pointerEvents: disableInteractions ? 'none' : 'auto',
                position: 'absolute',
                transform: `${textLeftRotate ? `rotate(${textLeftRotate}deg)` : ''}`,
                color: textColor,
                fontSize: textSizeleft,
                width: ImprintTextPosition?.left?.width,
                height: ImprintTextPosition?.left?.height,
                wordWrap: 'break-word',
                overflow: 'hidden',
                textTransform: 'uppercase',
                lineHeight: customLineHeight
                  ? `${customLineHeight}`
                  : `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}`,
                fontFamily: fontFamily,
                fontWeight: textBold ? 'bold' : 'normal',
                fontStyle: textItalic ? 'italic' : 'normal',
                textDecoration: textUnderline ? 'underline' : 'none',
                textAlign: textAlignment,
                letterSpacing: `${letterSpacing}px`,
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
                  lineHeight: customLineHeight
                    ? `${customLineHeight}`
                    : `${
                        ImprintTextPosition?.left?.lineHeight || '2.8rem'
                      }`,
                  textAlign: textAlignment,
                  fontWeight: textBold ? 'bold' : 'normal',
                  fontStyle: textItalic ? 'italic' : 'normal',
                  textDecoration: textUnderline ? 'underline' : 'none',
                  letterSpacing: `${letterSpacing}px`,
                  display: 'block',
                  boxSizing: 'border-box',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  textAlign: textAlignment,
                  lineHeight: customLineHeight
                    ? `${customLineHeight}`
                    : `${
                        ImprintTextPosition?.left?.lineHeight || '2.8rem'
                      }`,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  whiteSpace: 'pre-wrap',
                  display: 'block',
                  fontWeight: textBold ? 'bold' : 'normal',
                  fontStyle: textItalic ? 'italic' : 'normal',
                  textDecoration: textUnderline ? 'underline' : 'none',
                  letterSpacing: `${letterSpacing}px`,
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
        </Draggable>
      ) : (
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
            lineHeight: customLineHeight
              ? `${customLineHeight}`
              : `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}`,
            fontFamily: fontFamily,
            fontWeight: textBold ? 'bold' : 'normal',
            fontStyle: textItalic ? 'italic' : 'normal',
            textDecoration: textUnderline ? 'underline' : 'none',
            textAlign: textAlignment,
            letterSpacing: `${letterSpacing}px`,
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
              lineHeight: customLineHeight
                ? `${customLineHeight}`
                : `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}`,
              textAlign: textAlignment,
              fontWeight: textBold ? 'bold' : 'normal',
              fontStyle: textItalic ? 'italic' : 'normal',
              textDecoration: textUnderline ? 'underline' : 'none',
              letterSpacing: `${letterSpacing}px`,
              display: 'block',
              boxSizing: 'border-box',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              textAlign: textAlignment,
              lineHeight: customLineHeight
                ? `${customLineHeight}`
                : `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}`,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'pre-wrap',
              display: 'block',
              fontWeight: textBold ? 'bold' : 'normal',
              fontStyle: textItalic ? 'italic' : 'normal',
              textDecoration: textUnderline ? 'underline' : 'none',
              letterSpacing: `${letterSpacing}px`,
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
      )}

      {/* Right Text */}
      {!hideRightText && (
        <>
          {enableDragging && !disableInteractions ? (
            <Draggable
              position={rightDragPosition}
              onStop={handleRightDragStop}
              disabled={editingRight}
            >
              <div
                className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
                style={{
                  pointerEvents: disableInteractions ? 'none' : 'auto',
                  position: 'absolute',
                  transform: `${textRightRotate ? `rotate(${textRightRotate}deg)` : ''}`,
                  color: textColor,
                  fontSize: textSizeRight,
                  width: ImprintTextPosition?.right.width,
                  height: ImprintTextPosition?.right.height,
                  lineHeight: customLineHeight
                    ? `${customLineHeight}`
                    : `${ImprintTextPosition?.right?.lineHeight || '2.8rem'}`,
                  wordWrap: 'break-word',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  fontFamily: fontFamily,
                  fontWeight: textBold ? 'bold' : 'normal',
                  fontStyle: textItalic ? 'italic' : 'normal',
                  textDecoration: textUnderline ? 'underline' : 'none',
                  textAlign: textAlignment,
                  letterSpacing: `${letterSpacing}px`,
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
                      lineHeight: customLineHeight
                        ? `${customLineHeight}`
                        : `${
                            ImprintTextPosition?.right?.lineHeight || '2.8rem'
                          }`,
                      textAlign: textAlignment,
                      fontWeight: textBold ? 'bold' : 'normal',
                      fontStyle: textItalic ? 'italic' : 'normal',
                      textDecoration: textUnderline ? 'underline' : 'none',
                      letterSpacing: `${letterSpacing}px`,
                      display: 'block',
                      boxSizing: 'border-box',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: textAlignment,
                      lineHeight: customLineHeight
                        ? `${customLineHeight}`
                        : `${
                            ImprintTextPosition?.right?.lineHeight || '2.8rem'
                          }`,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      whiteSpace: 'pre-wrap',
                      display: 'block',
                      fontWeight: textBold ? 'bold' : 'normal',
                      fontStyle: textItalic ? 'italic' : 'normal',
                      textDecoration: textUnderline ? 'underline' : 'none',
                      letterSpacing: `${letterSpacing}px`,
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
            </Draggable>
          ) : (
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
                lineHeight: customLineHeight
                  ? `${customLineHeight}`
                  : `${ImprintTextPosition?.right?.lineHeight || '2.8rem'}`,
                wordWrap: 'break-word',
                overflow: 'hidden',
                textTransform: 'uppercase',
                fontFamily: fontFamily,
                fontWeight: textBold ? 'bold' : 'normal',
                fontStyle: textItalic ? 'italic' : 'normal',
                textDecoration: textUnderline ? 'underline' : 'none',
                textAlign: textAlignment,
                letterSpacing: `${letterSpacing}px`,
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
                    lineHeight: customLineHeight
                      ? `${customLineHeight}`
                      : `${
                          ImprintTextPosition?.right?.lineHeight || '2.8rem'
                        }`,
                    textAlign: textAlignment,
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontStyle: textItalic ? 'italic' : 'normal',
                    textDecoration: textUnderline ? 'underline' : 'none',
                    letterSpacing: `${letterSpacing}px`,
                    display: 'block',
                    boxSizing: 'border-box',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: textAlignment,
                    lineHeight: customLineHeight
                      ? `${customLineHeight}`
                      : `${
                          ImprintTextPosition?.right?.lineHeight || '2.8rem'
                        }`,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                    whiteSpace: 'pre-wrap',
                    display: 'block',
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontStyle: textItalic ? 'italic' : 'normal',
                    textDecoration: textUnderline ? 'underline' : 'none',
                    letterSpacing: `${letterSpacing}px`,
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
        </>
      )}
    </Html>
  );
};

export default HtmlComponent;
