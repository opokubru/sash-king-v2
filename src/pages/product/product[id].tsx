/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

import 'primeicons/primeicons.css';

// import { state } from '@/lib/store';

// import { Link } from "react-router-dom";
// import { InputText } from 'primereact/inputtext';

import { Dialog } from 'primereact/dialog';
// import './styles.css';
import { useParams, useNavigate } from 'react-router';

//arrays
import { colorOptions, noSpinFor, onlySashes } from '@/lib/neededArrays';

import { Toast } from 'primereact/toast';
import HtmlComponent from '@/components/HtmlComponent';

import { getCurrencySymbol } from '@/utils/helper';
import { OverlayPanel } from 'primereact/overlaypanel';
// import { readFileAsDataURL, uploadToStorage } from '@/utils/helper';
import HtmlImageComponent from '@/components/HtmlImageComponent';
import { TemplatedSash } from '@/lib/templated-sash';
import TakeTour from '@/components/TakeTour';
// import ImageUpload from '@/components/ImageUpload';
import { CustomButton } from '@/components/shared/shared_customs';
import { toast } from 'react-hot-toast';

const ConfiguratorUnisexSpecial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedClothing = TemplatedSash.find((item) => item.name === id);

  const displayImage = selectedClothing?.model_image;

  // const [selectedSize, setSelectedSize] = useState(1);
  // const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  // const [selectedPart, setSelectedPart] = useState<number | null>(
  //   notAll.includes(selectedClothing?.name as string) ? 0 : null,
  // );

  // const [isRotating, setIsRotating] = useState(true);

  const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = getCurrencySymbol('GHS');
  const currencyFactor = 1;

  // const [partPrices, setPartPrices] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // const [textPosition] = useState([-0.65, -0.15, 0.05]); // Initialize text position
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
  ];
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

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

    // try {
    //   const dataURL = await readFileAsDataURL(file);
    //   const downloadURL = await uploadToStorage(dataURL, 'sash');
    //   setFirebaseImageLeft(downloadURL);
    // } catch (error) {
    //   console.error('Image upload failed:', error);
    // }
  };

  const handleImageUploadRight = async (file: File) => {
    setUploadedImageRight(URL.createObjectURL(file));

    toast.success(
      'Image uploaded successfully. Focus would be on the pattern in your image, hence background may be removed where applicable',
    );

    // try {
    //   const dataURL = await readFileAsDataURL(file);
    //   const downloadURL = await uploadToStorage(dataURL, 'sash');
    //   setFirebaseImageRight(downloadURL);
    // } catch (error) {
    //   console.error('Image upload failed:', error);
    // }
  };

  const ImprintTextPosition = useMemo(() => {
    return {
      left: {
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
      },
      right: {
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
      },
    };
  }, [selectedClothing?.name, enteredTextLeft, enteredTextRight]);

  const [fontSizeLeft, setFontSizeLeft] = useState(
    ImprintTextPosition?.left?.size || 12,
  );
  const [fontSizeRight, setFontSizeRight] = useState(
    ImprintTextPosition?.right?.size || 12,
  );

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

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

  const increaseFontSizeLeft = () => {
    setFontSizeLeft((prevSize: any) => prevSize + 1);
  };

  const decreaseFontSizeLeft = () => {
    setFontSizeLeft((prevSize: any) => prevSize - 1);
  };

  const increaseFontSizeRight = () => {
    setFontSizeRight((prevSize: any) => prevSize + 1);
  };

  const decreaseFontSizeRight = () => {
    setFontSizeRight((prevSize: any) => prevSize - 1);
  };

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
    // Deactivate all editing mode first
    setEditingText(null);
    setShowTextEditor(false);
    console.log('captureCanvasAsImage started');

    try {
      const containerElement = canvasContainerRef.current;

      if (!containerElement) {
        console.error('Container element not found');
        return;
      }

      // Use getDisplayMedia to capture the current tab
      // preferCurrentTab + selfBrowserSurface helps Chrome auto-select current tab
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        preferCurrentTab: true,
        selfBrowserSurface: 'include',
        systemAudio: 'exclude',
        surfaceSwitching: 'exclude',
        monitorTypeSurfaces: 'exclude',
      } as any);

      // Create video element to capture frame
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      // Wait a frame for the video to be ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get container position and dimensions
      const rect = containerElement.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;

      // Create canvas to capture the frame
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        stream.getTracks().forEach((track) => track.stop());
        console.error('Could not get 2D context');
        return;
      }

      // Draw the cropped region from the video
      ctx.drawImage(
        video,
        rect.left * scale,
        rect.top * scale,
        rect.width * scale,
        rect.height * scale,
        0,
        0,
        rect.width * scale,
        rect.height * scale,
      );

      // Stop the stream
      stream.getTracks().forEach((track) => track.stop());

      const dataUrl = canvas.toDataURL('image/png');
      console.log('Image captured successfully');

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

  // Text editing bottom sheet
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [editingText, setEditingText] = useState<'left' | 'right' | null>(null);

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
                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl bottom-sheet-container max-w-2xl mx-auto"
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
                            Long press on text to change colors, fonts, and
                            sizes to fit space available
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                          <i className="pi pi-text text-purple-500"></i>
                          <span>Use space to wrap text to the next line</span>
                        </div> */}
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

                  {/* Font Size Controls */}
                  <div className="space-y-4">
                    {/* Left Text Size */}
                    <div>
                      <h6 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <i className="pi pi-text text-purple-500"></i>
                        Font Size{' '}
                        {selectedClothing?.name === 'Beads Bracelet'
                          ? ''
                          : '(Left)'}
                      </h6>
                      <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <button
                          className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center"
                          onClick={decreaseFontSizeLeft}
                          title="Decrease font size"
                        >
                          <i className="pi pi-minus text-sm"></i>
                        </button>
                        <div className="text-center">
                          <span className="text-lg font-bold text-gray-900 block">
                            {fontSizeLeft as number}
                          </span>
                          <span className="text-xs text-gray-500">px</span>
                        </div>
                        <button
                          className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center"
                          onClick={increaseFontSizeLeft}
                          title="Increase font size"
                        >
                          <i className="pi pi-plus text-sm"></i>
                        </button>
                      </div>
                    </div>

                    {/* Right Text Size */}
                    {selectedClothing?.name !== 'Beads Bracelet' && (
                      <div>
                        <h6 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <i className="pi pi-text text-orange-500"></i>
                          Font Size (Right)
                        </h6>
                        <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <button
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center"
                            onClick={decreaseFontSizeRight}
                            title="Decrease font size"
                          >
                            <i className="pi pi-minus text-sm"></i>
                          </button>
                          <div className="text-center">
                            <span className="text-lg font-bold text-gray-900 block">
                              {fontSizeRight as number}
                            </span>
                            <span className="text-xs text-gray-500">px</span>
                          </div>
                          <button
                            className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center"
                            onClick={increaseFontSizeRight}
                            title="Increase font size"
                          >
                            <i className="pi pi-plus text-sm"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <button
            onClick={handleShowInstructions}
            className="flex items-center gap-2"
            title="Show editing tips"
          >
            <i className="pi pi-question-circle text-sm text-primary"></i>
            <span className="font-bold text-primary">Help</span>
          </button>
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
                  camera={{
                    position: [0, 0, selectedClothing?.myZoom || 5],
                  }}
                  ref={canvasRef}
                  gl={{ preserveDrawingBuffer: true }}
                  className="h-full w-full"
                >
                  {displayImage && (
                    <Image
                      scale={
                        selectedClothing?.aspect
                          ? [
                              selectedClothing?.scale || 1,
                              (selectedClothing?.scale || 1) /
                                selectedClothing.aspect,
                            ]
                          : selectedClothing?.scale || 1
                      }
                      url={displayImage}
                    />
                  )}
                  {isLoading === false && (
                    <>
                      <HtmlComponent
                        textLeft={enteredTextLeft}
                        textRight={enteredTextRight}
                        textColor={textColor}
                        textSizeleft={fontSizeLeft as number}
                        textSizeRight={fontSizeRight as number}
                        fontFamily={fontFamily}
                        textLeftRotate={
                          selectedClothing?.positioningLeft?.text?.rotate
                        }
                        textRightRotate={
                          selectedClothing?.positioningRight?.text?.rotate
                        }
                        // textLeftOrientation={textLeftOrientation}
                        // textRightOrientation={textRightOrientation}

                        ImprintTextPosition={ImprintTextPosition as any}
                        hideRightText={
                          selectedClothing?.name === 'Beads Bracelet'
                        }
                        onTextLeftChange={setEnteredTextLeft}
                        onTextRightChange={setEnteredTextRight}
                        onTextLeftClick={() => handleTextClick('left')}
                        onTextRightClick={() => handleTextClick('right')}
                        onTextLeftLongPress={() => handleTextLongPress('left')}
                        onTextRightLongPress={() =>
                          handleTextLongPress('right')
                        }
                        selectedText={editingText}
                        disableInteractions={showTextEditor || showInstructions}
                        textAlignment="center"
                      />
                      <HtmlImageComponent
                        ImprintTextPosition={ImprintTextPosition}
                        imageLeft={uploadedImageLeft || ''}
                        imageRight={uploadedImageRight || ''}
                        hideLogo={selectedClothing?.name === 'Beads Bracelet'}
                        hideRightText={
                          selectedClothing?.name === 'Beads Bracelet'
                        }
                        disableInteractions={showTextEditor || showInstructions}
                        textColor={textColor}
                        onImageLeftChange={handleImageUploadLeft}
                        onImageRightChange={handleImageUploadRight}
                      />
                    </>
                  )}
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
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl bottom-sheet-container max-w-2xl mx-auto"
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
    </>
  );
};

export default ConfiguratorUnisexSpecial;
