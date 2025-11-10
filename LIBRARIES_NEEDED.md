# Libraries Needed for Full 3D Customization

## Required Libraries

### 1. **react-draggable** (For dragging text and images)

```bash
npm install react-draggable
npm install --save-dev @types/react-draggable
```

**Purpose**: Allows users to drag text and image overlays to any position on the canvas.

### 2. **react-color** (Advanced color picker)

```bash
npm install react-color
```

**Purpose**: Provides professional color picker with multiple formats (hex, rgb, hsl, etc.) for both 3D mesh parts and text.

### 3. **@react-three/drei** (Already installed - enhance usage)

**Purpose**: Already have this! Use `useRaycast` or build custom raycasting for mesh part selection.

### 4. **zustand** or **valtio** (Already using valtio)

**Purpose**: Already have valtio! Use it to manage part colors and positions.

## Optional but Recommended

### 5. **react-use-gesture** (Advanced gestures)

```bash
npm install @use-gesture/react
```

**Purpose**: Better touch/mouse gesture handling for drag, pinch, rotate on mobile.

### 6. **use-gesture** (If not using @use-gesture/react)

```bash
npm install use-gesture
```

## Implementation Approach

### For 3D Mesh Coloring:

- Use Three.js raycasting to detect mesh clicks
- Show color picker when part is selected
- Update valtio state which already handles colors

### For Text/Image Positioning:

- Use react-draggable to make HTML overlays draggable
- Track positions in component state
- Convert screen coordinates to 3D space coordinates
- Update HtmlComponent to use dynamic positions

### For Advanced Positioning:

- Allow users to click/drag on canvas
- Use raycasting to project 2D mouse position to 3D surface
- Place text/images at 3D coordinates

## Alternative Approach (More Advanced)

Instead of react-draggable, you could:

- Use native HTML5 drag API
- Use @react-three/drei's Html component with custom dragging
- Implement custom drag using Three.js raycasting for true 3D positioning
