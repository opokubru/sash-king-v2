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
  onPositionChange?: (
    side: 'left' | 'right',
    position: { x: number; y: number },
  ) => void;
  customPositions?: {
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  };
  maxLines?: number; // Maximum number of lines allowed (default: 3)
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
  maxLines = 3, // Default to 3 lines
}: HtmlComponentProps) => {
  const [leftDragPosition, setLeftDragPosition] = useState({ x: 0, y: 0 });
  const [rightDragPosition, setRightDragPosition] = useState({ x: 0, y: 0 });
  const leftDragStarted = useRef(false);
  const rightDragStarted = useRef(false);
  const leftDragStartPosition = useRef({ x: 0, y: 0 });
  const rightDragStartPosition = useRef({ x: 0, y: 0 });
  const [editingLeft, setEditingLeft] = useState(false);
  const [editingRight, setEditingRight] = useState(false);
  const [tempTextLeft, setTempTextLeft] = useState(textLeft);
  const [tempTextRight, setTempTextRight] = useState(textRight);
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  // Long press detection
  const leftLongPressTimer = useRef<NodeJS.Timeout | null>(null);
  const rightLongPressTimer = useRef<NodeJS.Timeout | null>(null);
  const LONG_PRESS_DURATION = 500; // 500ms for long press
  const leftLongPressStarted = useRef(false);
  const rightLongPressStarted = useRef(false);

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
    // Check if there was actual movement (more than 5px)
    const moved =
      Math.abs(data.x - leftDragStartPosition.current.x) > 5 ||
      Math.abs(data.y - leftDragStartPosition.current.y) > 5;

    if (moved) {
      setLeftDragPosition(newPosition);
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
      setRightDragPosition(newPosition);
      if (onPositionChange) {
        onPositionChange('right', newPosition);
      }
    } else {
      // It was just a click, not a drag
      rightDragStarted.current = false;
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
    // If drag started, don't handle click
    if (leftDragStarted.current) {
      leftDragStarted.current = false;
      return;
    }

    // If long press was triggered, don't handle click
    if (leftLongPressStarted.current) {
      // Reset flag after handling
      setTimeout(() => {
        leftLongPressStarted.current = false;
      }, 0);
      return;
    }

    // Single tap - immediately start inline editing
    if (!editingLeft) {
      setEditingLeft(true);
      if (onTextLeftClick) {
        onTextLeftClick();
      }
    }
  };

  const handleLeftTextMouseDown = () => {
    // Start long press timer
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
    }
    leftLongPressStarted.current = false;
    leftLongPressTimer.current = setTimeout(() => {
      // Long press detected - show bottom sheet
      leftLongPressStarted.current = true;
      if (onTextLeftLongPress) {
        onTextLeftLongPress();
      }
    }, LONG_PRESS_DURATION);
  };

  const handleLeftTextMouseUp = () => {
    // Clear long press timer on mouse up
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
      leftLongPressTimer.current = null;
    }
  };

  const handleLeftTextMouseLeave = () => {
    // Cancel long press timer if mouse leaves
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
      leftLongPressTimer.current = null;
    }
    leftLongPressStarted.current = false;
  };

  const handleLeftTextTouchStart = () => {
    // Start long press timer for touch
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
    }
    leftLongPressStarted.current = false;
    leftLongPressTimer.current = setTimeout(() => {
      // Long press detected - show bottom sheet
      leftLongPressStarted.current = true;
      if (onTextLeftLongPress) {
        onTextLeftLongPress();
      }
    }, LONG_PRESS_DURATION);
  };

  const handleLeftTextTouchMove = () => {
    // Cancel long press if user moves finger
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
      leftLongPressTimer.current = null;
    }
    leftLongPressStarted.current = false;
  };

  const handleLeftTextTouchEnd = () => {
    // Clear long press timer on touch end
    if (leftLongPressTimer.current) {
      clearTimeout(leftLongPressTimer.current);
      leftLongPressTimer.current = null;
    }

    // If long press was not triggered, handle as tap
    if (!leftLongPressStarted.current) {
      // Single tap - immediately start inline editing
      if (!editingLeft) {
        setEditingLeft(true);
        if (onTextLeftClick) {
          onTextLeftClick();
        }
      }
    } else {
      // Long press was triggered, reset flag
      leftLongPressStarted.current = false;
    }
  };

  const handleRightTextClick = () => {
    // If drag started, don't handle click
    if (rightDragStarted.current) {
      rightDragStarted.current = false;
      return;
    }

    // If long press was triggered, don't handle click
    if (rightLongPressStarted.current) {
      // Reset flag after handling
      setTimeout(() => {
        rightLongPressStarted.current = false;
      }, 0);
      return;
    }

    // Single tap - immediately start inline editing
    if (!editingRight) {
      setEditingRight(true);
      if (onTextRightClick) {
        onTextRightClick();
      }
    }
  };

  const handleRightTextMouseDown = () => {
    // Start long press timer
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
    }
    rightLongPressStarted.current = false;
    rightLongPressTimer.current = setTimeout(() => {
      // Long press detected - show bottom sheet
      rightLongPressStarted.current = true;
      if (onTextRightLongPress) {
        onTextRightLongPress();
      }
    }, LONG_PRESS_DURATION);
  };

  const handleRightTextMouseUp = () => {
    // Clear long press timer on mouse up
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
      rightLongPressTimer.current = null;
    }
  };

  const handleRightTextMouseLeave = () => {
    // Cancel long press timer if mouse leaves
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
      rightLongPressTimer.current = null;
    }
    rightLongPressStarted.current = false;
  };

  const handleRightTextTouchStart = () => {
    // Start long press timer for touch
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
    }
    rightLongPressStarted.current = false;
    rightLongPressTimer.current = setTimeout(() => {
      // Long press detected - show bottom sheet
      rightLongPressStarted.current = true;
      if (onTextRightLongPress) {
        onTextRightLongPress();
      }
    }, LONG_PRESS_DURATION);
  };

  const handleRightTextTouchMove = () => {
    // Cancel long press if user moves finger
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
      rightLongPressTimer.current = null;
    }
    rightLongPressStarted.current = false;
  };

  const handleRightTextTouchEnd = () => {
    // Clear long press timer on touch end
    if (rightLongPressTimer.current) {
      clearTimeout(rightLongPressTimer.current);
      rightLongPressTimer.current = null;
    }

    // If long press was not triggered, handle as tap
    if (!rightLongPressStarted.current) {
      // Single tap - immediately start inline editing
      if (!editingRight) {
        setEditingRight(true);
        if (onTextRightClick) {
          onTextRightClick();
        }
      }
    } else {
      // Long press was triggered, reset flag
      rightLongPressStarted.current = false;
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (leftLongPressTimer.current) {
        clearTimeout(leftLongPressTimer.current);
      }
      if (rightLongPressTimer.current) {
        clearTimeout(rightLongPressTimer.current);
      }
    };
  }, []);

  // Helper function to convert text (with \n) to HTML (with <br>)
  // No automatic wrapping - only breaks on user-entered line breaks (Enter)
  const textToHtml = (text: string): string => {
    return text.split('\n').join('<br>');
  };

  // Helper function to get current line count (explicit line breaks only)
  const getLineCount = (text: string): number => {
    return text.split('\n').length;
  };

  // Helper function to measure actual rendered lines including word wrapping
  const getActualLineCount = (
    text: string,
    width: number,
    fontSize: number,
    fontFamily: string,
    lineHeight: number,
    textTransform: string,
    letterSpacing: number,
  ): number => {
    // Use a hidden div to measure actual rendered height
    const measureDiv = document.createElement('div');
    measureDiv.style.position = 'absolute';
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.height = 'auto';
    measureDiv.style.width = `${width}px`;
    measureDiv.style.fontSize = `${fontSize}px`;
    measureDiv.style.fontFamily = fontFamily;
    measureDiv.style.lineHeight = `${lineHeight}px`;
    measureDiv.style.textTransform = textTransform;
    measureDiv.style.letterSpacing = `${letterSpacing}px`;
    measureDiv.style.wordWrap = 'break-word';
    measureDiv.style.overflowWrap = 'break-word';
    measureDiv.style.whiteSpace = 'pre-wrap';
    measureDiv.style.padding = '0';
    measureDiv.style.margin = '0';
    measureDiv.style.border = 'none';
    measureDiv.textContent = text;

    document.body.appendChild(measureDiv);
    const height = measureDiv.offsetHeight;
    document.body.removeChild(measureDiv);

    // Calculate number of lines based on height and line height
    const lineHeightValue =
      typeof lineHeight === 'number'
        ? lineHeight
        : parseFloat(String(lineHeight).replace('px', '').replace('rem', '')) *
          (String(lineHeight).includes('rem') ? 16 : 1);
    const actualLineHeight = lineHeightValue || fontSize * 1.2; // Fallback to 1.2x font size
    const lineCount = Math.ceil(height / actualLineHeight);

    return Math.max(lineCount, text.split('\n').length); // At least as many as explicit line breaks
  };

  const handleLeftTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const currentText = tempTextLeft;
    const textarea = e.target;

    // Get the actual width of the textarea (accounting for padding)
    const textareaWidth = textarea.offsetWidth - 4; // Subtract padding
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.left?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);

    // Check both explicit line breaks and actual rendered lines (with word wrapping)
    const explicitLineCount = getLineCount(newText);
    const actualLineCount = getActualLineCount(
      newText,
      textareaWidth,
      textSizeleft,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );

    // Use the maximum of explicit lines or actual rendered lines
    const totalLineCount = Math.max(explicitLineCount, actualLineCount);
    const currentTotalLineCount = Math.max(
      getLineCount(currentText),
      getActualLineCount(
        currentText,
        textareaWidth,
        textSizeleft,
        fontFamily,
        lineHeightNum,
        'uppercase',
        letterSpacing,
      ),
    );

    // Always allow if line count is decreasing (backspace/delete) or staying the same
    if (totalLineCount <= currentTotalLineCount) {
      setTempTextLeft(newText);
      return;
    }

    // Only prevent if line count is increasing AND would exceed maxLines
    if (totalLineCount > maxLines) {
      // Immediately restore previous value to prevent the change
      const cursorPos = textarea.selectionStart ?? 0;
      const savedCursorPos = Math.max(
        0,
        Math.min(cursorPos - 1, currentText.length),
      );

      // Restore value immediately
      textarea.value = currentText;
      textarea.setSelectionRange(savedCursorPos, savedCursorPos);

      // Prevent typing and show toast notification
      toast.error(`Maximum ${maxLines} lines allowed`, {
        duration: 2000,
        position: 'top-center',
      });

      // Don't update state - keep the old value
      return;
    }

    setTempTextLeft(newText);
  };

  const handleRightTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const currentText = tempTextRight;
    const textarea = e.target;

    // Get the actual width of the textarea (accounting for padding)
    const textareaWidth = textarea.offsetWidth - 4; // Subtract padding
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.right?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);

    // Check both explicit line breaks and actual rendered lines (with word wrapping)
    const explicitLineCount = getLineCount(newText);
    const actualLineCount = getActualLineCount(
      newText,
      textareaWidth,
      textSizeRight,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );

    // Use the maximum of explicit lines or actual rendered lines
    const totalLineCount = Math.max(explicitLineCount, actualLineCount);
    const currentTotalLineCount = Math.max(
      getLineCount(currentText),
      getActualLineCount(
        currentText,
        textareaWidth,
        textSizeRight,
        fontFamily,
        lineHeightNum,
        'uppercase',
        letterSpacing,
      ),
    );

    // Always allow if line count is decreasing (backspace/delete) or staying the same
    if (totalLineCount <= currentTotalLineCount) {
      setTempTextRight(newText);
      return;
    }

    // Only prevent if line count is increasing AND would exceed maxLines
    if (totalLineCount > maxLines) {
      // Immediately restore previous value to prevent the change
      const cursorPos = textarea.selectionStart ?? 0;
      const savedCursorPos = Math.max(
        0,
        Math.min(cursorPos - 1, currentText.length),
      );

      // Restore value immediately
      textarea.value = currentText;
      textarea.setSelectionRange(savedCursorPos, savedCursorPos);

      // Prevent typing and show toast notification
      toast.error(`Maximum ${maxLines} lines allowed`, {
        duration: 2000,
        position: 'top-center',
      });

      // Don't update state - keep the old value
      return;
    }

    setTempTextRight(newText);
  };

  const handleLeftTextBlur = () => {
    setEditingLeft(false);
    if (onTextLeftChange) {
      // Save text exactly as user typed it (no automatic wrapping)
      onTextLeftChange(tempTextLeft);
    }
  };

  const handleRightTextBlur = () => {
    setEditingRight(false);
    if (onTextRightChange) {
      // Save text exactly as user typed it (no automatic wrapping)
      onTextRightChange(tempTextRight);
    }
  };

  const handleLeftTextPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>,
  ) => {
    const pastedText = e.clipboardData.getData('text');
    const textarea = e.currentTarget;
    const currentValue = textarea.value;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    // Calculate what the new text would be
    const textBefore = currentValue.substring(0, selectionStart);
    const textAfter = currentValue.substring(selectionEnd);
    const newText = textBefore + pastedText + textAfter;

    const textareaWidth = textarea.offsetWidth - 4;
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.left?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);
    const explicitLineCount = getLineCount(newText);
    const actualLineCount = getActualLineCount(
      newText,
      textareaWidth,
      textSizeleft,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );
    const newLineCount = Math.max(explicitLineCount, actualLineCount);

    // If pasted text would exceed maxLines, prevent it
    if (newLineCount > maxLines) {
      e.preventDefault();
      toast.error(`Maximum ${maxLines} lines allowed`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleLeftTextKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = e.currentTarget;
    const currentValue = textarea.value;
    const textareaWidth = textarea.offsetWidth - 4;
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.left?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);

    // Get both explicit and actual line counts
    const explicitLineCount = getLineCount(currentValue);
    const actualLineCount = getActualLineCount(
      currentValue,
      textareaWidth,
      textSizeleft,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );
    const currentLineCount = Math.max(explicitLineCount, actualLineCount);

    // Always allow backspace, delete, and other control keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.ctrlKey ||
      e.metaKey ||
      e.key === 'Escape'
    ) {
      // Escape to cancel editing
      if (e.key === 'Escape') {
        setTempTextLeft(textLeft);
        setEditingLeft(false);
      }
      // Allow these keys to work normally
      return;
    }

    // Handle Enter key - allow manual line breaks
    if (e.key === 'Enter') {
      // Prevent Enter if already at maxLines (would create one more line)
      if (currentLineCount >= maxLines) {
        e.preventDefault();
        toast.error(`Maximum ${maxLines} lines allowed`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
      // Otherwise, let Enter work naturally - it will insert \n
      return;
    }

    // For any other key input (regular typing), check if we're at maxLines
    // If we're at maxLines, prevent any new character input that would exceed limit
    if (currentLineCount >= maxLines) {
      // Check if this input would create a new line
      // Get the current cursor position
      const cursorPos = textarea.selectionStart ?? 0;
      const textBeforeCursor = currentValue.substring(0, cursorPos);
      const textAfterCursor = currentValue.substring(cursorPos);

      // Calculate what the new text would be
      const newText = textBeforeCursor + e.key + textAfterCursor;
      const newExplicitLineCount = getLineCount(newText);
      const newActualLineCount = getActualLineCount(
        newText,
        textareaWidth,
        textSizeleft,
        fontFamily,
        lineHeightNum,
        'uppercase',
        letterSpacing,
      );
      const newLineCount = Math.max(newExplicitLineCount, newActualLineCount);

      // If it would exceed maxLines, prevent it
      if (newLineCount > maxLines) {
        e.preventDefault();
        toast.error(`Maximum ${maxLines} lines allowed`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
    }
  };

  const handleRightTextPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>,
  ) => {
    const pastedText = e.clipboardData.getData('text');
    const textarea = e.currentTarget;
    const currentValue = textarea.value;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    // Calculate what the new text would be
    const textBefore = currentValue.substring(0, selectionStart);
    const textAfter = currentValue.substring(selectionEnd);
    const newText = textBefore + pastedText + textAfter;

    const textareaWidth = textarea.offsetWidth - 4;
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.right?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);
    const explicitLineCount = getLineCount(newText);
    const actualLineCount = getActualLineCount(
      newText,
      textareaWidth,
      textSizeRight,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );
    const newLineCount = Math.max(explicitLineCount, actualLineCount);

    // If pasted text would exceed maxLines, prevent it
    if (newLineCount > maxLines) {
      e.preventDefault();
      toast.error(`Maximum ${maxLines} lines allowed`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleRightTextKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = e.currentTarget;
    const currentValue = textarea.value;
    const textareaWidth = textarea.offsetWidth - 4;
    const lineHeightValue =
      customLineHeight || ImprintTextPosition?.right?.lineHeight || 2.8;
    const lineHeightNum =
      typeof lineHeightValue === 'number'
        ? lineHeightValue
        : parseFloat(
            String(lineHeightValue).replace('px', '').replace('rem', ''),
          ) * (String(lineHeightValue).includes('rem') ? 16 : 1);

    // Get both explicit and actual line counts
    const explicitLineCount = getLineCount(currentValue);
    const actualLineCount = getActualLineCount(
      currentValue,
      textareaWidth,
      textSizeRight,
      fontFamily,
      lineHeightNum,
      'uppercase',
      letterSpacing,
    );
    const currentLineCount = Math.max(explicitLineCount, actualLineCount);

    // Always allow backspace, delete, and other control keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.ctrlKey ||
      e.metaKey ||
      e.key === 'Escape'
    ) {
      // Escape to cancel editing
      if (e.key === 'Escape') {
        setTempTextRight(textRight);
        setEditingRight(false);
      }
      // Allow these keys to work normally
      return;
    }

    // Handle Enter key - allow manual line breaks
    if (e.key === 'Enter') {
      // Prevent Enter if already at maxLines (would create one more line)
      if (currentLineCount >= maxLines) {
        e.preventDefault();
        toast.error(`Maximum ${maxLines} lines allowed`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
      // Otherwise, let Enter work naturally - it will insert \n
      return;
    }

    // For any other key input (regular typing), check if we're at maxLines
    // If we're at maxLines, prevent any new character input that would exceed limit
    if (currentLineCount >= maxLines) {
      // Check if this input would create a new line
      // Get the current cursor position
      const cursorPos = textarea.selectionStart ?? 0;
      const textBeforeCursor = currentValue.substring(0, cursorPos);
      const textAfterCursor = currentValue.substring(cursorPos);

      // Calculate what the new text would be
      const newText = textBeforeCursor + e.key + textAfterCursor;
      const newExplicitLineCount = getLineCount(newText);
      const newActualLineCount = getActualLineCount(
        newText,
        textareaWidth,
        textSizeRight,
        fontFamily,
        lineHeightNum,
        'uppercase',
        letterSpacing,
      );
      const newLineCount = Math.max(newExplicitLineCount, newActualLineCount);

      // If it would exceed maxLines, prevent it
      if (newLineCount > maxLines) {
        e.preventDefault();
        toast.error(`Maximum ${maxLines} lines allowed`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }
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
      {/* Left Text */}
      {enableDragging && !disableInteractions ? (
        <Draggable
          position={leftDragPosition}
          onStart={(_e, data) => {
            leftDragStartPosition.current = { x: data.x, y: data.y };
            leftDragStarted.current = true;
          }}
          onStop={(e, data) => {
            handleLeftDragStop(e, data);
            leftDragStarted.current = false;
          }}
          disabled={editingLeft}
        >
          <div
            className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
            style={{
              pointerEvents: disableInteractions ? 'none' : 'auto',
              position: 'absolute',
              transform: `${
                textLeftRotate ? `rotate(${textLeftRotate}deg)` : ''
              }`,
              color: textColor,
              fontSize: textSizeleft,
              width: ImprintTextPosition?.left?.width,
              height: ImprintTextPosition?.left?.height,
              wordWrap: 'normal',
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
              padding: '0',
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
            onTouchMove={handleLeftTextTouchMove}
            onTouchEnd={handleLeftTextTouchEnd}
          >
            {editingLeft ? (
              <textarea
                ref={leftInputRef as any}
                value={tempTextLeft}
                onChange={handleLeftTextChange}
                onBlur={handleLeftTextBlur}
                onKeyDown={handleLeftTextKeyDown}
                onPaste={handleLeftTextPaste}
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
                  wordWrap: 'normal',
                  overflowWrap: 'normal',
                  wordBreak: 'normal',
                  whiteSpace: 'pre',
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
                  caretColor: textColor,
                  WebkitTapHighlightColor: 'transparent',
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
                  wordWrap: 'normal',
                  overflowWrap: 'normal',
                  wordBreak: 'normal',
                  whiteSpace: textLeft !== '' ? 'pre' : 'normal',
                  display: 'block',
                  fontWeight: textBold ? 'bold' : 'normal',
                  fontStyle: textItalic ? 'italic' : 'normal',
                  textDecoration: textUnderline ? 'underline' : 'none',
                  letterSpacing: `${letterSpacing}px`,
                }}
                dangerouslySetInnerHTML={{
                  __html: hideRightText
                    ? textLeft !== ''
                      ? textToHtml(textLeft)
                      : 'TAP TO ADD TEXT'
                    : textLeft !== ''
                    ? textToHtml(textLeft)
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
                caretColor: textColor,
                WebkitTapHighlightColor: 'transparent',
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
                wordWrap: 'normal',
                overflowWrap: 'normal',
                wordBreak: 'normal',
                whiteSpace: textLeft !== '' ? 'pre' : 'normal',
                display: 'block',
                fontWeight: textBold ? 'bold' : 'normal',
                fontStyle: textItalic ? 'italic' : 'normal',
                textDecoration: textUnderline ? 'underline' : 'none',
                letterSpacing: `${letterSpacing}px`,
              }}
              dangerouslySetInnerHTML={{
                __html: hideRightText
                  ? textLeft !== ''
                    ? textToHtml(textLeft)
                    : 'TAP TO ADD TEXT'
                  : textLeft !== ''
                  ? textToHtml(textLeft)
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
              onStart={(_e, data) => {
                rightDragStartPosition.current = { x: data.x, y: data.y };
                rightDragStarted.current = true;
              }}
              onStop={(e, data) => {
                handleRightDragStop(e, data);
                rightDragStarted.current = false;
              }}
              disabled={editingRight}
            >
              <div
                className="overlay cursor-move hover:bg-blue-100 hover:bg-opacity-20 transition-colors"
                style={{
                  pointerEvents: disableInteractions ? 'none' : 'auto',
                  position: 'absolute',
                  transform: `${
                    textRightRotate ? `rotate(${textRightRotate}deg)` : ''
                  }`,
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
                onTouchMove={handleRightTextTouchMove}
                onTouchEnd={handleRightTextTouchEnd}
              >
                {editingRight ? (
                  <textarea
                    ref={rightInputRef as any}
                    value={tempTextRight}
                    onChange={handleRightTextChange}
                    onBlur={handleRightTextBlur}
                    onKeyDown={handleRightTextKeyDown}
                    onPaste={handleRightTextPaste}
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
                      caretColor: textColor,
                      WebkitTapHighlightColor: 'transparent',
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
                      wordWrap: 'normal',
                      overflowWrap: 'normal',
                      wordBreak: 'normal',
                      whiteSpace: textRight !== '' ? 'pre' : 'normal',
                      display: 'block',
                      fontWeight: textBold ? 'bold' : 'normal',
                      fontStyle: textItalic ? 'italic' : 'normal',
                      textDecoration: textUnderline ? 'underline' : 'none',
                      letterSpacing: `${letterSpacing}px`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        textRight !== ''
                          ? textToHtml(textRight)
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
                      : `${ImprintTextPosition?.right?.lineHeight || '2.8rem'}`,
                    textAlign: textAlignment,
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontStyle: textItalic ? 'italic' : 'normal',
                    textDecoration: textUnderline ? 'underline' : 'none',
                    letterSpacing: `${letterSpacing}px`,
                    display: 'block',
                    boxSizing: 'border-box',
                    caretColor: textColor,
                    WebkitTapHighlightColor: 'transparent',
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
                      : `${ImprintTextPosition?.right?.lineHeight || '2.8rem'}`,
                    wordWrap: 'normal',
                    overflowWrap: 'normal',
                    wordBreak: 'normal',
                    whiteSpace: textRight !== '' ? 'pre' : 'normal',
                    display: 'block',
                    fontWeight: textBold ? 'bold' : 'normal',
                    fontStyle: textItalic ? 'italic' : 'normal',
                    textDecoration: textUnderline ? 'underline' : 'none',
                    letterSpacing: `${letterSpacing}px`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      textRight !== ''
                        ? textToHtml(textRight)
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
