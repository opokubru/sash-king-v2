/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';
import { state } from '@/lib/store';

interface MeshPartColorPickerProps {
  selectedPartIndex: number | null;
  partName?: string;
  onClose: () => void;
  currentColor: string;
}

export const MeshPartColorPicker = ({
  selectedPartIndex,
  partName,
  onClose,
  currentColor,
}: MeshPartColorPickerProps) => {
  const [color, setColor] = useState(currentColor);

  const handleColorChange = (newColor: ColorResult) => {
    const hexColor = newColor.hex;
    setColor(hexColor);
    
    if (selectedPartIndex !== null && state.color) {
      // Update the color for the selected part in valtio state
      (state.color as any)[selectedPartIndex] = hexColor;
    }
  };

  const handleColorChangeComplete = (newColor: ColorResult) => {
    const hexColor = newColor.hex;
    if (selectedPartIndex !== null && state.color) {
      (state.color as any)[selectedPartIndex] = hexColor;
    }
  };

  if (selectedPartIndex === null) return null;

  return (
    <div className="space-y-4">
      <SketchPicker
        color={color}
        onChange={handleColorChange}
        onChangeComplete={handleColorChangeComplete}
        disableAlpha
        width="100%"
      />

      <div className="flex gap-2">
        <input
          type="text"
          value={color}
          onChange={(e) => {
            const newColor = e.target.value;
            setColor(newColor);
            if (/^#[0-9A-F]{6}$/i.test(newColor)) {
              if (selectedPartIndex !== null && state.color) {
                (state.color as any)[selectedPartIndex] = newColor;
              }
            }
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="#000000"
        />
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
};


