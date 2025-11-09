# Full 3D Customization Implementation Guide

## Overview
This guide explains how to implement full user control over:
1. **Dragging text to any position**
2. **Dragging images to any position**  
3. **Coloring any part of the 3D mesh**

## Libraries Installed ✅
- `react-draggable` - For dragging HTML elements
- `react-color` - Professional color picker
- `@use-gesture/react` - Already installed for gestures

## Implementation Steps

### 1. Draggable Text & Images

**Approach**: Use `react-draggable` with `Html` component from `@react-three/drei`

**Key Points**:
- Html elements use screen coordinates (not 3D)
- Track position in state (X, Y pixels)
- Convert screen position to 3D space for proper rendering
- Use `transform` CSS for positioning

**State Management**:
```typescript
const [textLeftPosition, setTextLeftPosition] = useState({ x: 0, y: 0 });
const [textRightPosition, setTextRightPosition] = useState({ x: 0, y: 0 });
const [imageLeftPosition, setImageLeftPosition] = useState({ x: 0, y: 0 });
const [imageRightPosition, setImageRightPosition] = useState({ x: 0, y: 0 });
```

### 2. 3D Mesh Part Coloring

**Approach**: Use Three.js raycasting to detect mesh clicks

**Implementation**:
1. Enable mesh click detection in `Shirt` component
2. Store selected part index
3. Show color picker when part is selected
4. Update valtio state for that part's color
5. Material automatically updates (already implemented)

**Key Code Pattern**:
```typescript
// In Shirt component
const handleMeshClick = (event: ThreeEvent<MouseEvent>, index: number) => {
  event.stopPropagation();
  setSelectedPart(index);
  // Open color picker panel
};
```

### 3. Position Tracking

**For 2D HTML Overlays**:
- Store positions as `{ x: number, y: number }` in pixels
- Update on drag event: `onStop={(e, data) => setPosition({ x: data.x, y: data.y })}`

**For 3D Positioning** (Advanced):
- Use raycasting to project 2D mouse to 3D surface
- Store 3D coordinates `{ x: number, y: number, z: number }`
- Use `useThree` hook from @react-three/fiber

## Component Structure

### Enhanced Components Needed:

1. **DraggableHtmlText** - Wrapper around Html text with react-draggable
2. **DraggableHtmlImage** - Wrapper around Html image with react-draggable  
3. **MeshPartSelector** - Component to handle mesh clicks and selection
4. **PartColorPicker** - Panel to pick colors for selected mesh parts
5. **PositionControls** - Advanced X/Y/Z positioning panel

## User Flow

1. **Color 3D Parts**:
   - Click on 3D mesh part → Part highlights → Color picker opens → Select color → Part updates

2. **Position Text**:
   - Click text → Enter edit mode OR long-press → Open advanced editor
   - Click and drag text → Position updates in real-time
   - Or use X/Y input fields for precise positioning

3. **Position Images**:
   - Click image → Upload or drag to reposition
   - Drag image → Position updates in real-time

## Next Steps

See the implemented components in:
- `src/components/DraggableHtmlComponent.tsx` (NEW)
- `src/components/DraggableHtmlImageComponent.tsx` (NEW)
- `src/components/MeshPartColorPicker.tsx` (NEW)
- Updated `src/pages/product/product[id]-3d.tsx`


