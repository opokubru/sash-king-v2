/* eslint-disable @typescript-eslint/no-explicit-any */
import { state } from '@/lib/store';
import { colorOptions } from '@/lib/neededArrays';

interface MeshPartColorPickerProps {
  selectedPartIndex: number | null;
  partName?: string;
  onClose: () => void;
  currentColor: string;
}

export const MeshPartColorPicker = ({
  selectedPartIndex,
  // partName,
  // onClose,
  currentColor,
}: MeshPartColorPickerProps) => {
  const handleColorSelect = (colorHex: string) => {
    if (selectedPartIndex !== null && state.color) {
      (state.color as any)[selectedPartIndex] = colorHex;
    }
  };

  if (selectedPartIndex === null) return null;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-3">
          Select Color
        </label>
        <div className="w-full overflow-x-auto py-2 scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {colorOptions.map((colorOption, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(colorOption.color)}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-3 transition-all transform hover:scale-110 ${
                  currentColor.toLowerCase() === colorOption.color.toLowerCase()
                    ? 'border-gray-800 scale-110 shadow-lg ring-2 ring-blue-500'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: colorOption.color }}
                title={colorOption.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
