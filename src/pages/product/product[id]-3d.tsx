/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import uuid from 'react-uuid';
import { TextureLoader } from 'three';

import 'primeicons/primeicons.css';

import { state } from '@/lib/store';

import html2canvas from 'html2canvas';

import { Dialog } from 'primereact/dialog';
import { useParams, useNavigate } from 'react-router';

//arrays
import { colorOptions, noSpinFor, onlySashes } from '@/lib/neededArrays';

import { Toast } from 'primereact/toast';
import HtmlComponent from '@/components/HtmlComponent';

import { getCurrencySymbol } from '@/utils/helper';
import { OverlayPanel } from 'primereact/overlaypanel';
import HtmlImageComponent from '@/components/HtmlImageComponent';
import { CustomButton } from '@/components/shared/shared_customs';
import { ThreeDSashes } from '@/lib/3d-sash';
import TakeTour from '@/components/TakeTour';
import LoadingAnimation from '@/components/LoadingAnimation';
import { MeshPartColorPicker } from '@/components/MeshPartColorPicker';
import toast from 'react-hot-toast';

interface ShirtProps {
  isRotating: boolean;
  selectedClothing: any;
  selectedPart: number | null;
  setSelectedPart: (value: number | null) => void;
  selectedTexture: any;
}

// Assign default colors based on sash type constraints (utility function)
const assignDefaultColors = (selectedClothing: any, state: any) => {
  if (!selectedClothing?.myNode || !state.color) return;

  const nodeCount = selectedClothing.myNode.length;

  // Initialize color array if needed
  if (!Array.isArray(state.color) || state.color.length < nodeCount) {
    (state.color as any) = new Array(nodeCount).fill('#ffffff');
  }

  // Check for Type 1 pattern: has plain_sections/plain_section, Stripe_1/stripe_1, Stripe_2/stripe_2, mid_stripes
  const hasType1Pattern = selectedClothing.myNode.some(
    (node: any) =>
      node.name === 'plain_sections' ||
      node.name === 'plain_section' ||
      node.name === 'Stripe_1' ||
      node.name === 'stripe_1',
  );

  // Check for Type 2 pattern: has mid_section, stripe_1, stripe_2
  const hasType2Pattern = selectedClothing.myNode.some(
    (node: any) => node.name === 'mid_section',
  );

  if (hasType1Pattern) {
    // Type 1: Arranged to match image pattern - black background with green, yellow, red stripes
    selectedClothing.myNode.forEach((node: any, index: number) => {
      if (node.name === 'plain_sections' || node.name === 'plain_section') {
        (state.color as any)[index] = '#000000'; // Black (background/outer section)
      } else if (node.name === 'Stripe_1' || node.name === 'stripe_1') {
        (state.color as any)[index] = '#228B22'; // Forest Green (first stripe)
      } else if (node.name === 'Stripe_2' || node.name === 'stripe_2') {
        (state.color as any)[index] = '#FFD700'; // Gold/Yellow (second stripe)
      } else if (node.name === 'mid_stripes') {
        (state.color as any)[index] = '#DC143C'; // Crimson Red (third stripe/edge)
      } else {
        // Fallback for any other nodes
        (state.color as any)[index] = '#ffffff';
      }
    });
  } else if (hasType2Pattern) {
    // Type 2: Both stripes get the same golden color, mid_section is black
    selectedClothing.myNode.forEach((node: any, index: number) => {
      if (node.name === 'mid_section') {
        (state.color as any)[index] = '#000000'; // Black
      } else if (node.name === 'stripe_1' || node.name === 'stripe_2') {
        (state.color as any)[index] = '#FFD700'; // Gold (same for both stripes)
      } else {
        // Fallback for any other nodes
        (state.color as any)[index] = '#ffffff';
      }
    });
  } else {
    // For other types, assign white to all nodes
    selectedClothing.myNode.forEach((_node: any, index: number) => {
      (state.color as any)[index] = '#ffffff';
    });
  }
};

// Generate random hex color (utility function) - for randomize button
const generateRandomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
};

// Generate random color array based on sash type constraints (utility function) - returns color array
const generateRandomColorArray = (
  selectedClothing: any,
  nodeCount: number,
): string[] => {
  const colors = new Array(nodeCount).fill('#ffffff');

  // Check for Type 1 pattern: has plain_sections/plain_section, Stripe_1/stripe_1, Stripe_2/stripe_2, mid_stripes
  const hasType1Pattern = selectedClothing.myNode.some(
    (node: any) =>
      node.name === 'plain_sections' ||
      node.name === 'plain_section' ||
      node.name === 'Stripe_1' ||
      node.name === 'stripe_1',
  );

  // Check for Type 2 pattern: has mid_section, stripe_1, stripe_2
  const hasType2Pattern = selectedClothing.myNode.some(
    (node: any) => node.name === 'mid_section',
  );

  if (hasType1Pattern) {
    // Type 1: Each stripe gets a different random color (like default colors)
    const generateUniqueColor = (existingColors: string[]): string => {
      let newColor = generateRandomColor();
      let attempts = 0;
      // Ensure the new color is different from existing ones
      while (existingColors.includes(newColor) && attempts < 20) {
        newColor = generateRandomColor();
        attempts++;
      }
      return newColor;
    };

    const usedColors: string[] = [];

    selectedClothing.myNode.forEach((node: any, index: number) => {
      if (node.name === 'plain_sections' || node.name === 'plain_section') {
        const color = generateUniqueColor(usedColors);
        colors[index] = color;
        usedColors.push(color);
      } else if (node.name === 'Stripe_1' || node.name === 'stripe_1') {
        const color = generateUniqueColor(usedColors);
        colors[index] = color;
        usedColors.push(color);
      } else if (node.name === 'Stripe_2' || node.name === 'stripe_2') {
        const color = generateUniqueColor(usedColors);
        colors[index] = color;
        usedColors.push(color);
      } else if (node.name === 'mid_stripes') {
        const color = generateUniqueColor(usedColors);
        colors[index] = color;
        usedColors.push(color);
      } else {
        // Fallback for any other nodes
        colors[index] = generateRandomColor();
      }
    });
  } else if (hasType2Pattern) {
    // Type 2: stripe_1 and stripe_2 same, mid_section different
    const stripeColor = generateRandomColor();
    let midColor = generateRandomColor();

    // Ensure mid_section has different color
    let attempts = 0;
    while (midColor === stripeColor && attempts < 10) {
      midColor = generateRandomColor();
      attempts++;
    }

    selectedClothing.myNode.forEach((node: any, index: number) => {
      if (node.name === 'stripe_1' || node.name === 'stripe_2') {
        colors[index] = stripeColor;
      } else if (node.name === 'mid_section') {
        colors[index] = midColor;
      } else {
        // Fallback for any other nodes
        colors[index] = generateRandomColor();
      }
    });
  } else {
    // For other types, assign random colors to all nodes
    selectedClothing.myNode.forEach((_node: any, index: number) => {
      colors[index] = generateRandomColor();
    });
  }

  return colors;
};

const Shirt = ({
  isRotating,
  selectedClothing,
  selectedPart,
  setSelectedPart,
}: ShirtProps) => {
  const snap = useSnapshot(state);

  // Guard against undefined model path - use a fallback to ensure hook is always called
  const modelPath = selectedClothing?.model || '/models/sash.glb';

  // Always call the hook (React hooks rule)
  const gltf = useGLTF(modelPath);
  const nodes = gltf
    ? Array.isArray(gltf)
      ? (gltf as any).nodes
      : gltf.nodes
    : null;

  const groupRef = useRef<any>();

  useFrame(() => {
    if (isRotating && groupRef.current) {
      const rotationSpeed = 0.01;
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  useEffect(() => {
    if (!isRotating && groupRef.current) {
      groupRef.current.rotation.y = 0;
    }
  }, [isRotating]);

  const [isLoading, setIsLoading] = useState(true);
  const [highlightAllNodes, setHighlightAllNodes] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      // Keep highlighting for 3 seconds after load, then fade out
      const highlightTimeout = setTimeout(() => {
        setHighlightAllNodes(false);
      }, 3000);
      return () => clearTimeout(highlightTimeout);
    }, 2000);

    // Initialize and assign default colors on load
    if (selectedClothing?.myNode && state.color) {
      const nodeCount = selectedClothing.myNode.length;

      // Ensure color array is properly initialized
      if (!Array.isArray(state.color) || state.color.length !== nodeCount) {
        (state.color as any) = new Array(nodeCount).fill('#ffffff');
      }

      // Assign default colors based on sash type
      assignDefaultColors(selectedClothing, state);
    }

    // Reset texture array
    if (state.texture && Array.isArray(state.texture)) {
      const nodeCount = selectedClothing?.myNode?.length || 0;
      if (state.texture.length !== nodeCount) {
        (state.texture as any) = new Array(nodeCount).fill(null);
      } else {
        for (let i = 0; i < state.texture.length; i++) {
          (state.texture as any)[i] = null;
        }
      }
    }

    // Reset highlighting when clothing changes
    setHighlightAllNodes(true);

    return () => clearTimeout(loadingTimeout);
  }, [selectedClothing]);

  // Don't render if model or nodes are not available
  if (!selectedClothing?.model || !nodes) {
    return (
      <group ref={groupRef}>
        <LoadingAnimation />
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        selectedClothing.myNode?.map((node: any, index: number) => {
          const nodeName = node?.name;
          const color = snap.color[index] || '#ffffff';
          const texture = snap.texture[index] || null;

          // Skip if node doesn't exist in the model
          if (!nodes[nodeName]?.geometry) {
            return null;
          }

          // Determine if this node should be highlighted (only on initial load)
          const shouldHighlight = highlightAllNodes;

          return (
            <mesh
              key={uuid()}
              castShadow
              geometry={(nodes as any)[nodeName]?.geometry}
              onClick={(e) => {
                e.stopPropagation();
                if (setSelectedPart) {
                  setSelectedPart(index === selectedPart ? null : index);
                }
                // Stop highlighting all nodes when user clicks
                setHighlightAllNodes(false);
              }}
              onPointerOver={() => {
                // Optional: Change cursor on hover
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              <meshStandardMaterial
                attach="material"
                color={color || '#ffffff'}
                map={texture ? new TextureLoader().load(texture) : null}
                roughness={1}
                emissive={
                  shouldHighlight
                    ? '#3B82F6' // Blue for initial highlight
                    : undefined
                }
                emissiveIntensity={
                  shouldHighlight
                    ? 1.5 // Subtle blue glow for all nodes on initial load
                    : 0
                }
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

const ConfiguratorUnisex3D = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedClothing = ThreeDSashes.find((item) => item.id === id);

  // console.log({ selectedClothing, id });

  // const displayImage = selectedClothing?.model_image;

  // const [selectedSize, setSelectedSize] = useState(1);
  // const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [isRotating] = useState(false);

  // Color history for randomize navigation
  const [colorHistory, setColorHistory] = useState<string[][]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  // const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = getCurrencySymbol('GHS');
  const currencyFactor = 1;
  const snap = useSnapshot(state);

  // const [partPrices, setPartPrices] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show color picker when a part is selected
  useEffect(() => {
    if (selectedPart !== null) {
      setShowColorPicker(true);
    } else {
      setShowColorPicker(false);
    }
  }, [selectedPart]);

  // Reset color history when clothing changes
  useEffect(() => {
    setColorHistory([]);
    setCurrentHistoryIndex(-1);
  }, [selectedClothing?.name]);

  // Handle randomize colors with history
  const handleRandomizeColors = () => {
    if (!selectedClothing?.myNode || !state.color) return;

    const nodeCount = selectedClothing.myNode.length;

    // Initialize color array if needed
    if (!Array.isArray(state.color) || state.color.length < nodeCount) {
      (state.color as any) = new Array(nodeCount).fill('#ffffff');
    }

    // Generate new random colors
    const newColors = generateRandomColorArray(selectedClothing, nodeCount);

    // Save current colors to history before changing (if not already at the end)
    const currentColors = [...(state.color as string[])];

    // If we're not at the end of history, remove everything after current index
    const newHistory = colorHistory.slice(0, currentHistoryIndex + 1);

    // Add current colors to history if they're different from the last entry
    if (
      newHistory.length === 0 ||
      JSON.stringify(newHistory[newHistory.length - 1]) !==
        JSON.stringify(currentColors)
    ) {
      newHistory.push(currentColors);
    }

    // Add new colors to history
    newHistory.push(newColors);

    // Update history and index
    setColorHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);

    // Apply new colors
    (state.color as any) = newColors;
  };

  // Handle previous colors
  const handlePreviousColors = () => {
    if (currentHistoryIndex > 0 && colorHistory.length > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      (state.color as any) = [...colorHistory[newIndex]];
    }
  };

  // Handle next colors
  const handleNextColors = () => {
    if (
      currentHistoryIndex < colorHistory.length - 1 &&
      colorHistory.length > 0
    ) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      (state.color as any) = [...colorHistory[newIndex]];
    }
  };

  //total price
  // useEffect(() => {
  //   setPartPrices(selectedClothing?.sizeOptions[1]?.colorPriceValue || 0);
  // }, []);

  //total price
  // const bikiniTotal = (
  //   (partPrices + selectedClothing?.price) *
  //   currencyFactor
  // ).toFixed();

  const total = useMemo(() => {
    if (
      noSpinFor.includes(selectedClothing?.name as string) ||
      selectedClothing?.name === 'Earring'
    ) {
      return ((selectedClothing?.price || 0) * currencyFactor).toFixed(2);
    } else {
      return ((selectedClothing?.price || 0) * currencyFactor).toFixed(2);
    }
  }, [
    currencyFactor,
    // partPrices,
    selectedClothing?.name,
    selectedClothing?.price,
  ]);

  // Declare state for entered text and generated texture
  const [enteredTextLeft, setEnteredTextLeft] = useState('');
  const [enteredTextRight, setEnteredTextRight] = useState('');

  const [textColor, setTextColor] = useState(
    selectedClothing?.textColor || 'gold',
  );
  const [fontFamily, setFontFamily] = useState('Arial');

  const fonts = [
    'Arial',
    'Verdana',
    'Courier New',
    'Roboto',
    'Comic Sans MS',
    'Book Antiqua',
    'Times New Roman',
    'Georgia',
    'Palatino',
    'Garamond',
    'Trebuchet MS',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Century Gothic',
    'Futura',
    'Helvetica',
    'Brush Script MT',
    'Baskerville',
    'Copperplate',
    'Papyrus',
    'Optima',
    'Franklin Gothic',
    'Calibri',
    'Candara',
    'Constantia',
    'Corbel',
    'Segoe UI',
    'Geneva',
    'Monaco',
  ];
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  // Advanced text styling (kept for HtmlComponent compatibility, but not used in simplified UI)
  const [textAlignment] = useState<'left' | 'center' | 'right' | 'justify'>(
    'center',
  );
  const [textBold] = useState(false);
  const [textItalic] = useState(false);
  const [textUnderline] = useState(false);
  const [letterSpacing] = useState(0);
  const [lineHeight] = useState(1.2);

  // Position controls (kept for HtmlComponent compatibility, but not used in simplified UI)
  const [positionX] = useState(0);
  const [positionY] = useState(0);
  const [rotationAngle] = useState(0);

  // Dragging state
  const [enableDragging] = useState(false);

  // Dragging and position helpers removed - dragging is disabled

  // Text editing bottom sheet
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [editingText, setEditingText] = useState<'left' | 'right' | null>(null);

  const textEditRef = useRef(null);

  // Image imprint
  const [uploadedImageLeft, setUploadedImageLeft] = useState<string | null>(
    null,
  );
  const [uploadedImageRight, setUploadedImageRight] = useState<string | null>(
    null,
  );

  // Container ref for capturing the canvas
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUploadLeft = async (file: File) => {
    setUploadedImageLeft(URL.createObjectURL(file));
    toast.success(
      'Image uploaded successfully. Focus would be on the pattern in your image, hence background may be removed where applicable',
    );
  };

  const handleImageUploadRight = async (file: File) => {
    setUploadedImageRight(URL.createObjectURL(file));
    toast.success(
      'Image uploaded successfully. Focus would be on the pattern in your image, hence background may be removed where applicable',
    );
  };

  const ImprintTextPosition = useMemo(() => {
    const baseLeft = {
      text: enteredTextLeft,
      top: selectedClothing?.positioningLeft?.text.top,
      left: selectedClothing?.positioningLeft?.text.left,
      height: selectedClothing?.positioningLeft?.text.height,
      width: selectedClothing?.positioningLeft?.text.width,
      lineHeight: selectedClothing?.positioningLeft?.text.lineHeight,
      image: {
        top: selectedClothing?.positioningLeft?.image.top,
        left: selectedClothing?.positioningLeft?.image.left,
        height: selectedClothing?.positioningLeft?.image.height,
        width: selectedClothing?.positioningLeft?.image.width,
      },
      size: selectedClothing?.positioningLeft?.text?.size || 12,
    };

    const baseRight = {
      text: enteredTextRight,
      top: selectedClothing?.positioningRight?.text.top,
      left: selectedClothing?.positioningRight?.text.left,
      height: selectedClothing?.positioningRight?.text.height,
      width: selectedClothing?.positioningRight?.text.width,
      lineHeight: selectedClothing?.positioningRight?.text.lineHeight,
      image: {
        top: selectedClothing?.positioningRight?.image.top,
        left: selectedClothing?.positioningRight?.image.left,
        height: selectedClothing?.positioningRight?.image.height,
        width: selectedClothing?.positioningRight?.image.width,
      },
      size: selectedClothing?.positioningRight?.text.size || 12,
    };

    // Apply custom positioning if editing
    if (editingText === 'left') {
      return {
        left: {
          ...baseLeft,
          left: positionX !== 0 ? `${positionX}px` : baseLeft.left,
          top: positionY !== 0 ? `${positionY}px` : baseLeft.top,
          lineHeight: lineHeight || baseLeft.lineHeight,
        },
        right: baseRight,
      };
    } else if (editingText === 'right') {
      return {
        left: baseLeft,
        right: {
          ...baseRight,
          left: positionX !== 0 ? `${positionX}px` : baseRight.left,
          top: positionY !== 0 ? `${positionY}px` : baseRight.top,
          lineHeight: lineHeight || baseRight.lineHeight,
        },
      };
    }

    return {
      left: baseLeft,
      right: baseRight,
    };
  }, [
    selectedClothing?.positioningLeft,
    selectedClothing?.positioningRight,
    enteredTextLeft,
    enteredTextRight,
    editingText,
    positionX,
    positionY,
    lineHeight,
  ]);

  // Initialize font sizes from selectedClothing defaults
  const [fontSizeLeft, setFontSizeLeft] = useState(
    selectedClothing?.positioningLeft?.text?.size || 12,
  );
  const [fontSizeRight, setFontSizeRight] = useState(
    selectedClothing?.positioningRight?.text?.size || 12,
  );

  // Update font sizes when clothing changes
  useEffect(() => {
    if (selectedClothing?.positioningLeft?.text?.size) {
      setFontSizeLeft(selectedClothing.positioningLeft.text.size);
    }
    if (selectedClothing?.positioningRight?.text?.size) {
      setFontSizeRight(selectedClothing.positioningRight.text.size);
    }
  }, [
    selectedClothing?.name,
    selectedClothing?.positioningLeft?.text?.size,
    selectedClothing?.positioningRight?.text?.size,
  ]);

  const [isLoadingModel, setIsLoadingModel] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoadingModel(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // const handleLeftTextOrientation = () => {
  //   if (textLeftOrientation === 'horizontal') {
  //     setTextLeftOrientation('vertical');
  //   }

  //   if (textLeftOrientation === 'vertical') {
  //     setTextLeftOrientation('horizontal');
  //   }
  // };

  // const handleRightTextOrientation = () => {
  //   if (textRightOrientation === 'horizontal') {
  //     setTextRightOrientation('vertical');
  //   }

  //   if (textRightOrientation === 'vertical') {
  //     setTextRightOrientation('horizontal');
  //   }
  // };

  const handleChangeFont = () => {
    let newIndex = currentFontIndex + 1;

    // Loop back to the start or end of the array if needed
    if (newIndex < 0) {
      newIndex = fonts.length - 1;
    } else if (newIndex >= fonts.length) {
      newIndex = 0;
    }
    setCurrentFontIndex(newIndex);
    setFontFamily(fonts[newIndex]);
  };

  // const increaseFontSizeLeft = () => {
  //   setFontSizeLeft((prevSize: any) => prevSize + 1);
  // };

  // const decreaseFontSizeLeft = () => {
  //   setFontSizeLeft((prevSize: any) => prevSize - 1);
  // };

  // const increaseFontSizeRight = () => {
  //   setFontSizeRight((prevSize: any) => prevSize + 1);
  // };

  // const decreaseFontSizeRight = () => {
  //   setFontSizeRight((prevSize: any) => prevSize - 1);
  // };

  // Create an array to store selected parts with their color and texture information
  // const selectedParts = selectedClothing?.myNode?.map((nodeName, index) => ({
  //   name: nodeName.name,
  //   color: state.color[index] || null,
  //   texture: state.texture[index] || null,
  // }));

  // Confrimation or not

  // Helper function to convert blob URL to data URL
  const blobToDataURL = (blobUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!blobUrl.startsWith('blob:')) {
        resolve(blobUrl);
        return;
      }
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const captureCanvasAsImage = async () => {
    console.log('captureCanvasAsImage started');

    try {
      // Use the container ref which wraps the Canvas
      const containerElement = canvasContainerRef.current;

      if (!containerElement) {
        console.error('Container element not found');
        return;
      }

      console.log('Capturing image...');
      const canvasImage = await html2canvas(containerElement, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        scale: 1,
      });

      console.log('Image captured successfully');
      const dataUrl = canvasImage.toDataURL();

      // Convert blob URLs to data URLs for uploaded images
      let uploadedImageLeftDataUrl = '';
      let uploadedImageRightDataUrl = '';

      if (uploadedImageLeft) {
        try {
          uploadedImageLeftDataUrl = await blobToDataURL(uploadedImageLeft);
          console.log('Converted left image blob to data URL');
        } catch (error) {
          console.error('Failed to convert left image:', error);
        }
      }

      if (uploadedImageRight) {
        try {
          uploadedImageRightDataUrl = await blobToDataURL(uploadedImageRight);
          console.log('Converted right image blob to data URL');
        } catch (error) {
          console.error('Failed to convert right image:', error);
        }
      }

      // Store the order data in sessionStorage
      const orderData = {
        currencySymbol,
        total: Number(total),
        readyBy: selectedClothing?.readyIn || 0,
        name: selectedClothing?.name || '',
        textLeft: enteredTextLeft || '',
        textRight: enteredTextRight || '',
        modelImage: dataUrl,
        customSizeValues: {},
        uploadedImageLeft: uploadedImageLeftDataUrl,
        uploadedImageRight: uploadedImageRightDataUrl,
        fontSizeLeft,
        fontSizeRight,
        fontFamily,
        textColor,
      };

      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      console.log('Order data stored, navigating to confirmation...');

      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (error) {
      console.error('Error capturing canvas:', error);
    }
  };

  // Create a state object to store the form field values

  // Handle changes in the size form fields

  // description dialogs
  // const [selectedTexture, setSelectedTexture] = useState({});

  // parse part title

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);

  // Direct editing instructions
  const [showInstructions, setShowInstructions] = useState(true);

  const handleTourStart = () => {
    setShowTour(true);
    setShowTourPopup(false);
  };

  const handleTourLater = () => {
    setShowTourPopup(false);
  };

  const handleTourClose = () => {
    setShowTour(false);
    localStorage.setItem('tourCompleted', 'true'); // Save tour completion status
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted === 'true') {
      setShowTourPopup(false); // If tour completed, don't show it
    } else {
      setShowTourPopup(false); // Show the tour for new users
    }
  }, []);

  // Show instructions on page load
  useEffect(() => {
    const instructionsShown = localStorage.getItem('instructionsShown');
    if (!instructionsShown) {
      setTimeout(() => {
        setShowInstructions(true);
      }, 2000); // Show after 2 seconds
    }
  }, []);

  const handleInstructionsDismiss = () => {
    setShowInstructions(false);
    localStorage.setItem('instructionsShown', 'true');
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleTextClick = (side: 'left' | 'right') => {
    setEditingText(side);
    // Regular tap - just select for inline editing, don't show bottom sheet
  };

  const handleTextLongPress = (side: 'left' | 'right') => {
    setEditingText(side);
    setShowTextEditor(true);
  };

  const handleTextEditorClose = () => {
    setShowTextEditor(false);
    setEditingText(null);
  };

  // const handleRetakeTour = () => {
  //   setShowTour(true);
  // };

  // customer height
  // const [gender, setGender] = useState('');
  // const [beadType, setBeadType] = useState('Glass');

  // const handleAllPartsClick = () => {
  //   setSelectedPart(0); // Use 0 instead of 'all'
  // };

  // const handleSelectPart = (index: number) => {
  //   if (selectedPart === index) {
  //     setShowGlow(false);
  //     setSelectedPart(null);
  //     return;
  //   }
  //   setSelectedPart(index);
  //   setShowGlow(true);
  // };

  const demoType = useMemo(() => {
    if (selectedClothing?.name === 'Earring') {
      return 'earring';
    }

    if (selectedClothing?.name === 'Bikini') {
      return 'bikini';
    }

    if (selectedClothing?.name === 'Beads Bracelet') {
      return 'bangle';
    }

    if (onlySashes.includes(selectedClothing?.name as string)) {
      return 'sash';
    }
  }, [selectedClothing?.name]);

  // Handle case where product is not found
  if (!selectedClothing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested product could not be found.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Nav /> */}
      <Toast ref={toastRef} />
      <>
        {showTourPopup && (
          <Dialog
            // header="Welcome to the 3D Customization!"
            visible={showTourPopup}
            className="col-12 col-sm-6"
            onHide={handleTourLater}
            dismissableMask={true}
          >
            <div className="tour-popup">
              <h2>Welcome to the 3D customization!</h2>
              <p>Would you like to take a quick tour?</p>
              <button className="btn btn-success m-3" onClick={handleTourStart}>
                Take Tour
              </button>
              <button
                className="btn btn-secondary m-3"
                onClick={handleTourLater}
              >
                Maybe Later
              </button>
            </div>
          </Dialog>
        )}

        {showTour && (
          <TakeTour
            isOpen={showTour}
            onClose={handleTourClose}
            type={demoType}
          />
        )}

        {/* Direct Editing Instructions Bottom Sheet */}
        {typeof window !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {showInstructions && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-50 bottom-sheet-backdrop"
                    onClick={handleInstructionsDismiss}
                    style={{ zIndex: 999998 }}
                  />

                  {/* Bottom Sheet */}
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{
                      type: 'spring',
                      damping: 25,
                      stiffness: 200,
                    }}
                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl bottom-sheet-container"
                    onClick={(e) => e.stopPropagation()}
                    style={{ zIndex: 999999 }}
                  >
                    {/* Drag Handle */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <i className="pi pi-lightbulb text-yellow-500 text-lg"></i>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Quick Tip
                          </h3>
                        </div>
                        <button
                          onClick={handleInstructionsDismiss}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="pi pi-times text-sm"></i>
                        </button>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <i className="pi pi-info-circle text-blue-500"></i>
                          <span>Click directly on text to edit it</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="pi pi-image text-green-500"></i>
                          <span>
                            Click on image box to upload logos or images
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="pi pi-palette text-purple-500"></i>
                          <span>
                            Double tap on text to change colors, fonts, and
                            sizes to fit space available
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="pi pi-th-large text-blue-500"></i>
                          <span>Tap on cut-out sections to change colors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="pi pi-info-circle text-blue-500"></i>
                          <span>
                            Cant' t decide on colors? Use "Randomize" button
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleInstructionsDismiss}
                          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                        >
                          Got it!
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </>

      <div className="main-space ">
        {/* Header Section */}
        <div className="flex items-center justify-center text-center p-4 ">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
                Customizing {selectedClothing?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Design your personalized sash with custom text and images
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="hidden">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ">
              {/* Format Text Section */}
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Format Text
                    </h3>
                    <p className="text-sm text-gray-500">
                      Customize text appearance and styling
                    </p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={(e) => (textEditRef.current as any)?.toggle(e)}
                >
                  <i className="pi pi-cog text-sm"></i>
                  <span>Customize</span>
                  <i className="pi pi-chevron-down text-xs"></i>
                </button>
              </div>

              <OverlayPanel
                showCloseIcon
                ref={textEditRef}
                className="w-96 p-6 bg-white border border-gray-200 rounded-xl shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <h6 className="text-lg font-semibold text-gray-900 mb-1">
                      Text Styling
                    </h6>
                    <p className="text-sm text-gray-500">
                      Customize your text appearance
                    </p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <h6 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="pi pi-palette text-blue-500"></i>
                      Text Color
                    </h6>
                    {selectedClothing?.name === 'Beads Bracelet' ? (
                      <div className="text-center py-4">
                        <span className="text-gray-500 text-sm">
                          Color customization not available for this product
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-6 gap-2">
                        {colorOptions.slice(0, 6).map((colorOption, index) => (
                          <button
                            key={index}
                            className={`w-10 h-10 rounded-full border-3 transition-all transform hover:scale-110 ${
                              textColor === colorOption.label
                                ? 'border-gray-800 scale-110 shadow-lg'
                                : 'border-gray-300 hover:border-gray-500'
                            }`}
                            onClick={() => setTextColor(colorOption.label)}
                            style={{
                              backgroundColor: colorOption.color,
                            }}
                            title={colorOption.label}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Font Style */}
                  <div>
                    <h6 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="pi pi-font text-green-500"></i>
                      Font Style
                    </h6>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-700 block">
                          Current Font
                        </span>
                        <span className="text-xs text-gray-500">
                          {fontFamily}
                        </span>
                      </div>
                      <button
                        className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                        onClick={handleChangeFont}
                        title="Change font style"
                      >
                        <i className="pi pi-sync text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShowInstructions}
              className="flex items-center gap-2"
              title="Show editing tips"
            >
              <i className="pi pi-question-circle text-sm text-primary"></i>
              <span className="font-bold text-primary">Help</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousColors}
                disabled={currentHistoryIndex <= 0 || colorHistory.length === 0}
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous colors"
              >
                <i className="pi pi-chevron-left text-sm"></i>
              </button>
              <button
                onClick={handleRandomizeColors}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                title="Randomize colors"
              >
                <i className="pi pi-refresh text-sm"></i>
                <span className="font-medium text-sm">Randomize</span>
              </button>
              <button
                onClick={handleNextColors}
                disabled={
                  currentHistoryIndex >= colorHistory.length - 1 ||
                  colorHistory.length === 0
                }
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next colors"
              >
                <i className="pi pi-chevron-right text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 relative">
            <div
              ref={canvasContainerRef}
              className="right-panel h-[40rem] lg:h-[80vh] relative overflow-hidden"
              style={{
                isolation: 'isolate',
                contain: 'layout style paint',
                clipPath: 'inset(0)',
              }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ zIndex: 1 }}
              >
                <Canvas
                  camera={{ position: [0, 0, selectedClothing?.myZoom || 5] }}
                  gl={{ preserveDrawingBuffer: true }}
                  className="main-canvas h-full w-full"
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  {selectedClothing &&
                    selectedClothing.name &&
                    isLoadingModel === false && (
                      <>
                        <HtmlComponent
                          textLeft={enteredTextLeft}
                          textRight={enteredTextRight}
                          textColor={
                            editingText &&
                            !colorOptions.find((c) => c.label === textColor)
                              ? textColor
                              : colorOptions.find((c) => c.label === textColor)
                                  ?.color || textColor
                          }
                          textSizeleft={fontSizeLeft}
                          textSizeRight={fontSizeRight}
                          fontFamily={fontFamily}
                          textLeftRotate={
                            editingText === 'left' && rotationAngle !== 0
                              ? rotationAngle
                              : selectedClothing?.positioningLeft?.text
                                  ?.rotate || 0
                          }
                          textRightRotate={
                            editingText === 'right' && rotationAngle !== 0
                              ? rotationAngle
                              : selectedClothing?.positioningRight?.text
                                  ?.rotate || 0
                          }
                          ImprintTextPosition={ImprintTextPosition as any}
                          hideRightText={
                            selectedClothing?.name?.includes(
                              'Beads Bracelet',
                            ) || false
                          }
                          onTextLeftChange={setEnteredTextLeft}
                          onTextRightChange={setEnteredTextRight}
                          onTextLeftClick={() => handleTextClick('left')}
                          onTextRightClick={() => handleTextClick('right')}
                          onTextLeftLongPress={() =>
                            handleTextLongPress('left')
                          }
                          onTextRightLongPress={() =>
                            handleTextLongPress('right')
                          }
                          selectedText={editingText}
                          disableInteractions={
                            showTextEditor || showInstructions
                          }
                          textBold={textBold}
                          textItalic={textItalic}
                          textUnderline={textUnderline}
                          textAlignment={textAlignment}
                          letterSpacing={letterSpacing}
                          customLineHeight={lineHeight}
                          enableDragging={enableDragging}
                          maxLines={9}
                        />
                        <HtmlImageComponent
                          ImprintTextPosition={ImprintTextPosition as any}
                          imageLeft={uploadedImageLeft}
                          imageRight={uploadedImageRight || ''}
                          hideLogo={
                            selectedClothing?.name?.includes(
                              'Beads Bracelet',
                            ) || false
                          }
                          hideRightText={
                            selectedClothing?.name?.includes(
                              'Beads Bracelet',
                            ) || false
                          }
                          textColor={textColor}
                          onImageLeftChange={handleImageUploadLeft}
                          onImageRightChange={handleImageUploadRight}
                          disableInteractions={
                            showTextEditor || showInstructions
                          }
                          enableDragging={enableDragging}
                        />
                      </>
                    )}
                  <Shirt
                    isRotating={isRotating}
                    selectedClothing={selectedClothing}
                    selectedPart={selectedPart}
                    setSelectedPart={setSelectedPart}
                    selectedTexture={state.texture[selectedPart || 0]}
                  />
                  {/* {selectedClothing?.name &&
                  !noSpinFor.includes(selectedClothing.name) && (
                    <OrbitControls enableRotate={false} />
                  )} */}
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Editing Bottom Sheet */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showTextEditor && editingText && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black bg-opacity-50 bottom-sheet-backdrop"
                  onClick={handleTextEditorClose}
                  style={{ zIndex: 999998 }}
                />

                {/* Bottom Sheet */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                  }}
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl bottom-sheet-container"
                  onClick={(e) => e.stopPropagation()}
                  style={{ zIndex: 999999 }}
                >
                  {/* Drag Handle */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="px-6 pb-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        Edit Text - {editingText === 'left' ? 'Left' : 'Right'}
                      </h3>
                      <button
                        onClick={handleTextEditorClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <i className="pi pi-times text-xl"></i>
                      </button>
                    </div>

                    <section className="overflow-y-auto h-full max-h-[10rem]">
                      {/* Font Size Controls */}
                      <div className="mb-4 ">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Size:{' '}
                          {editingText === 'left'
                            ? Number(fontSizeLeft)
                            : Number(fontSizeRight)}
                          px
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (editingText === 'left') {
                                setFontSizeLeft((prev: any) =>
                                  Math.max(10, Number(prev) - 1),
                                );
                              } else {
                                setFontSizeRight((prev: any) =>
                                  Math.max(10, Number(prev) - 1),
                                );
                              }
                            }}
                            className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <i className="pi pi-minus text-sm"></i>
                          </button>
                          <div className="flex-1 bg-gray-100 rounded-lg h-2 relative">
                            <div
                              className="bg-blue-600 h-full rounded-lg transition-all"
                              style={{
                                width: `${
                                  ((Number(
                                    editingText === 'left'
                                      ? fontSizeLeft
                                      : fontSizeRight,
                                  ) -
                                    10) /
                                    50) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <button
                            onClick={() => {
                              if (editingText === 'left') {
                                setFontSizeLeft((prev: any) =>
                                  Math.min(60, Number(prev) + 1),
                                );
                              } else {
                                setFontSizeRight((prev: any) =>
                                  Math.min(60, Number(prev) + 1),
                                );
                              }
                            }}
                            className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                          >
                            <i className="pi pi-plus text-sm"></i>
                          </button>
                        </div>
                      </div>

                      {/* Text Color */}
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Color
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                          {colorOptions
                            .slice(0, 6)
                            .map((colorOption, index) => (
                              <button
                                key={index}
                                className={`w-8 h-8 rounded-full border-3 transition-all transform hover:scale-110 ${
                                  textColor === colorOption.label
                                    ? 'border-gray-800 scale-110 shadow-lg'
                                    : 'border-gray-300 hover:border-gray-500'
                                }`}
                                onClick={() => setTextColor(colorOption.label)}
                                style={{ backgroundColor: colorOption.color }}
                                title={colorOption.label}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Font Style */}
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Font
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {fonts.map((font, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setCurrentFontIndex(index);
                                setFontFamily(font);
                              }}
                              className={`px-1  py-2 rounded-lg border-2 transition-all text-sm ${
                                fontFamily === font
                                  ? 'border-blue-500 bg-blue-50 font-semibold'
                                  : 'border-gray-200 hover:border-gray-400'
                              }`}
                              style={{ fontFamily: font }}
                            >
                              {font}
                            </button>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-t-2xl shadow-2xl relative z-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Order Details */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 lg:gap-8">
              {/* Delivery Time */}
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Estimated Delivery
                  </p>
                  <p className="text-xl font-bold text-white">
                    {selectedClothing?.readyIn} days
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Total Price
                  </p>
                  <p className="text-xl font-bold text-white">
                    {currencySymbol}
                    {total}
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Button */}
            <div className="flex justify-center lg:justify-end">
              <CustomButton
                className="bg-primary text-white"
                onPress={captureCanvasAsImage}
              >
                <i className="pi pi-check-circle text-lg"></i>
                Complete Order
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mesh Part Color Picker Bottom Sheet */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedPart !== null && showColorPicker && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black bg-opacity-50 bottom-sheet-backdrop"
                  onClick={() => {
                    setShowColorPicker(false);
                    setSelectedPart(null);
                  }}
                  style={{ zIndex: 999998 }}
                />

                {/* Bottom Sheet */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                  }}
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl bottom-sheet-container"
                  onClick={(e) => e.stopPropagation()}
                  style={{ zIndex: 999999 }}
                >
                  {/* Drag Handle */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="px-6 pb-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Color Part
                        </h3>
                        {selectedClothing?.myNode?.[selectedPart] && (
                          <p className="text-sm text-gray-500 mt-1">
                            {selectedClothing.myNode[selectedPart].name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setShowColorPicker(false);
                          setSelectedPart(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <i className="pi pi-times text-xl"></i>
                      </button>
                    </div>

                    {/* Color Picker */}
                    <div>
                      <MeshPartColorPicker
                        selectedPartIndex={selectedPart}
                        partName={
                          selectedClothing?.myNode?.[selectedPart]?.name
                        }
                        onClose={() => {
                          setShowColorPicker(false);
                          setSelectedPart(null);
                        }}
                        currentColor={snap.color[selectedPart] || '#ffffff'}
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default ConfiguratorUnisex3D;
