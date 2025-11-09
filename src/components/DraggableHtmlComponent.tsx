/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import toast from 'react-hot-toast';

interface DraggableHtmlComponentProps {
  textLeft: string;
  textRight: string;
  textColor: string;
  textSizeleft: number;
  textSizeRight: number;
  fontFamily: string;
  textLeftRotate?: number;
  textRightRotate?: number;
  ImprintTextPosition: {
    left: {
      top: string;
      left: string;
      width: number;
      height: number;
      lineHeight: number;
    };
    right: {
      top: string;
      left: string;
      width: number;
      height: number;
      lineHeight: number;
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
  textBold?: boolean;
  textItalic?: boolean;
  textUnderline?: boolean;
  textAlignment?: 'left' | 'center' | 'right' | 'justify';
  letterSpacing?: number;
  customLineHeight?: number;
  // New props for dragging
  enableDragging?: boolean;
  onPositionChange?: (
    side: 'left' | 'right',
    position: { x: number; y: number },
  ) => void;
  customPositions?: {
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  };
}

const DraggableHtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSizeleft,
  textSizeRight,
  fontFamily,
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
}: DraggableHtmlComponentProps) => {
  const [editingLeft, setEditingLeft] = useState(false);
  const [editingRight, setEditingRight] = useState(false);
  const [tempTextLeft, setTempTextLeft] = useState(textLeft);
  const [tempTextRight, setTempTextRight] = useState(textRight);
  const [leftPosition, setLeftPosition] = useState({ x: 0, y: 0 });
  const [rightPosition, setRightPosition] = useState({ x: 0, y: 0 });
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  // Double tap detection
  const leftLastTapTime = useRef<number>(0);
  const rightLastTapTime = useRef<number>(0);
  const leftTapTimeout = useRef<NodeJS.Timeout | null>(null);
  const rightTapTimeout = useRef<NodeJS.Timeout | null>(null);
  const DOUBLE_TAP_DELAY = 300; // 300ms window for double tap

  // Drag detection
  const leftDragStarted = useRef(false);
  const rightDragStarted = useRef(false);
  const leftDragStartPosition = useRef({ x: 0, y: 0 });
  const rightDragStartPosition = useRef({ x: 0, y: 0 });

  // Initialize positions from customPositions or ImprintTextPosition
  useEffect(() => {
    if (customPositions?.left) {
      setLeftPosition(customPositions.left);
    } else {
      // Parse initial position from ImprintTextPosition
      const left = parseInt(ImprintTextPosition.left.left) || 0;
      const top = parseInt(ImprintTextPosition.left.top) || 0;
      setLeftPosition({ x: left, y: top });
    }

    if (customPositions?.right) {
      setRightPosition(customPositions.right);
    } else {
      const left = parseInt(ImprintTextPosition.right?.left || '0') || 0;
      const top = parseInt(ImprintTextPosition.right?.top || '0') || 0;
      setRightPosition({ x: left, y: top });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeftDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    // Check if there was actual movement (more than 5px)
    const moved =
      Math.abs(data.x - leftDragStartPosition.current.x) > 5 ||
      Math.abs(data.y - leftDragStartPosition.current.y) > 5;

    if (moved) {
      setLeftPosition(newPosition);
      if (onPositionChange) {
        onPositionChange('left', newPosition);
      }
    } else {
      // It was just a click, not a drag
      leftDragStarted.current = false;
    }
  };

  const handleRightDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    // Check if there was actual movement (more than 5px)
    const moved =
      Math.abs(data.x - rightDragStartPosition.current.x) > 5 ||
      Math.abs(data.y - rightDragStartPosition.current.y) > 5;

    if (moved) {
      setRightPosition(newPosition);
      if (onPositionChange) {
        onPositionChange('right', newPosition);
      }
    } else {
      // It was just a click, not a drag
      rightDragStarted.current = false;
    }
  };

  const handleLeftTextClick = () => {
    // If drag started, don't handle click
    if (leftDragStarted.current) {
      leftDragStarted.current = false;
      return;
    }

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

  const handleRightTextClick = () => {
    // If drag started, don't handle click
    if (rightDragStarted.current) {
      rightDragStarted.current = false;
      return;
    }

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

  // Cleanup timeouts on unmount
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

  // Helper to wrap text
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
        const first7Chars = remaining.substring(0, 7);
        const lastSpaceIndex = first7Chars.lastIndexOf(' ');
        const breakPoint = lastSpaceIndex > 0 ? lastSpaceIndex + 1 : 7;
        lines.push(remaining.substring(0, breakPoint));
        remaining = remaining.substring(breakPoint).replace(/^\s+/, '');
      }
    }
    return lines.join('\n');
  };

  const wrapTextToHtml = (text: string): string => {
    return wrapTextAt7Chars(text).split('\n').join('<br>');
  };

  const getLineCount = (text: string): number => {
    return text.split('\n').length;
  };

  const handleLeftTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const lineCount = getLineCount(newText);
    if (lineCount > 3) {
      toast.error('Maximum 3 lines allowed', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }
    setTempTextLeft(newText);
  };

  const handleRightTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const lineCount = getLineCount(newText);
    if (lineCount > 3) {
      toast.error('Maximum 3 lines allowed', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }
    setTempTextRight(newText);
  };

  const handleLeftTextBlur = () => {
    setEditingLeft(false);
    if (onTextLeftChange) {
      onTextLeftChange(wrapTextAt7Chars(tempTextLeft));
    }
  };

  const handleRightTextBlur = () => {
    setEditingRight(false);
    if (onTextRightChange) {
      onTextRightChange(wrapTextAt7Chars(tempTextRight));
    }
  };

  // Create text element wrapper
  const createTextElement = (
    side: 'left' | 'right',
    text: string,
    tempText: string,
    isEditing: boolean,
    inputRef: React.RefObject<HTMLInputElement>,
    position: { x: number; y: number },
    fontSize: number,
    rotate?: number,
  ) => {
    const isSelected = selectedText === side;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      transform: `translate(${
        enableDragging && customPositions?.[side]
          ? `${customPositions[side]?.x || 0}px, ${
              customPositions[side]?.y || 0
            }px`
          : position
          ? `${position.x}px, ${position.y}px`
          : `${ImprintTextPosition[side]?.left || '0'}, ${
              ImprintTextPosition[side]?.top || '0'
            }`
      }) ${rotate ? `rotate(${rotate}deg)` : ''}`,
      color: textColor,
      fontSize,
      width: ImprintTextPosition[side].width,
      height: ImprintTextPosition[side].height,
      wordWrap: 'break-word',
      overflow: 'hidden',
      textTransform: 'uppercase',
      lineHeight: customLineHeight
        ? `${customLineHeight}`
        : `${ImprintTextPosition[side].lineHeight || '2.8rem'}`,
      fontFamily,
      fontWeight: textBold ? 'bold' : 'normal',
      fontStyle: textItalic ? 'italic' : 'normal',
      textDecoration: textUnderline ? 'underline' : 'none',
      textAlign: textAlignment,
      letterSpacing: `${letterSpacing}px`,
      opacity: disableInteractions ? 0 : text !== '' ? 1 : 1,
      visibility: disableInteractions ? 'hidden' : 'visible',
      borderRadius: '4px',
      padding: '2px',
      border: isSelected
        ? '2px dashed #3B82F6'
        : text === ''
        ? '2px dashed #ccc'
        : '2px solid transparent',
      boxShadow: isSelected ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none',
      cursor: enableDragging && !disableInteractions ? 'move' : 'pointer',
      pointerEvents: disableInteractions ? 'none' : 'auto',
    };

    const handleClick =
      side === 'left' ? handleLeftTextClick : handleRightTextClick;
    const handleTouchEnd =
      side === 'left' ? handleLeftTextTouchEnd : handleRightTextTouchEnd;

    const textElement = (
      <div style={baseStyle} onClick={handleClick} onTouchEnd={handleTouchEnd}>
        {isEditing ? (
          <textarea
            ref={inputRef as any}
            value={tempText}
            onChange={
              side === 'left' ? handleLeftTextChange : handleRightTextChange
            }
            onBlur={side === 'left' ? handleLeftTextBlur : handleRightTextBlur}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              height: '100%',
              fontSize,
              fontFamily,
              color: textColor,
              resize: 'none',
              fontWeight: textBold ? 'bold' : 'normal',
              fontStyle: textItalic ? 'italic' : 'normal',
              textDecoration: textUnderline ? 'underline' : 'none',
              letterSpacing: `${letterSpacing}px`,
              textAlign: textAlignment,
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
                : `${ImprintTextPosition[side].lineHeight || '2.8rem'}`,
              fontWeight: textBold ? 'bold' : 'normal',
              fontStyle: textItalic ? 'italic' : 'normal',
              textDecoration: textUnderline ? 'underline' : 'none',
              letterSpacing: `${letterSpacing}px`,
            }}
            dangerouslySetInnerHTML={{
              __html: text !== '' ? wrapTextToHtml(text) : 'TAP TO ADD TEXT',
            }}
          />
        )}
      </div>
    );

    if (enableDragging && !disableInteractions) {
      return (
        <Draggable
          position={position}
          onStart={(_e, data) => {
            if (side === 'left') {
              leftDragStartPosition.current = { x: data.x, y: data.y };
              leftDragStarted.current = true;
            } else {
              rightDragStartPosition.current = { x: data.x, y: data.y };
              rightDragStarted.current = true;
            }
          }}
          onStop={(e, data) => {
            if (side === 'left') {
              handleLeftDragStop(e, data);
              leftDragStarted.current = false;
            } else {
              handleRightDragStop(e, data);
              rightDragStarted.current = false;
            }
          }}
          disabled={isEditing}
        >
          {textElement}
        </Draggable>
      );
    }

    return textElement;
  };

  return (
    <Html
      className={disableInteractions ? 'html-disabled' : ''}
      style={{
        zIndex: disableInteractions ? -1 : 0,
        pointerEvents: disableInteractions ? 'none' : 'auto',
      }}
    >
      {createTextElement(
        'left',
        textLeft,
        tempTextLeft,
        editingLeft,
        leftInputRef,
        leftPosition,
        textSizeleft,
        textLeftRotate,
      )}

      {!hideRightText &&
        createTextElement(
          'right',
          textRight,
          tempTextRight,
          editingRight,
          rightInputRef,
          rightPosition,
          textSizeRight,
          textRightRotate,
        )}
    </Html>
  );
};

export default DraggableHtmlComponent;
