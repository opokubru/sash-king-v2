/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Image } from '@react-three/drei';
// import { state } from '@/lib/store';

// import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';

import Confirmation from './Confirmation';
import html2canvas from 'html2canvas';

import { Dialog } from 'primereact/dialog';
// import './styles.css';
import { useParams } from 'react-router';

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
import ImageUpload from '@/components/ImageUpload';

const ConfiguratorUnisexSpecial = () => {
  const { id } = useParams();
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
  // const [textLeftOrientation, setTextLeftOrientation] = useState('horizontal');
  // const [textRightOrientation, setTextRightOrientation] =
  //   useState('horizontal');

  // const [textPosition] = useState([-0.65, -0.15, 0.05]); // Initialize text position
  const [textColor, setTextColor] = useState(
    selectedClothing?.textColor || 'white',
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

  // const [firebaseImageLeft, setFirebaseImageLeft] = useState<string | null>(
  //   null,
  // );
  // const [firebaseImageRight, setFirebaseImageRight] = useState<string | null>(
  //   null,
  // );

  // const imageLeftRef = useRef();
  // const imageRightRef = useRef();

  // Early return if no product found
  // if (!selectedClothing) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">
  //           Product Not Found
  //         </h1>
  //         <p className="text-gray-600">
  //           The requested sash template could not be found.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  const handleImageUploadLeft = async (file: File) => {
    setUploadedImageLeft(URL.createObjectURL(file));
    (toastRef.current as any)?.show({
      severity: 'success',
      summary: 'Please Note',
      detail:
        'Focus would be on the pattern in your image, hence background may be removed where applicable',
    });

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

    (toastRef.current as any)?.show({
      severity: 'success',
      summary: 'Please Note',
      detail:
        'Focus would be on the pattern in your image, hence background may be removed where applicable',
    });

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
        size: selectedClothing?.positioningLeft?.text,
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
        size: selectedClothing?.positioningRight?.text,
      },
    };
  }, [selectedClothing?.name]);

  const [fontSizeLeft, setFontSizeLeft] = useState(
    ImprintTextPosition?.left?.size || 18,
  );
  const [fontSizeRight, setFontSizeRight] = useState(
    ImprintTextPosition?.right?.size || 18,
  );

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
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

  // Create an array to store selected parts with their color and texture information
  // const selectedParts = selectedClothing?.myNode?.map((nodeName, index) => ({
  //   name: nodeName.name,
  //   color: state.color[index] || null,
  //   texture: state.texture[index] || null,
  // }));

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState('');

  const captureCanvasAsImage = async () => {
    // setIsRotating(false);

    setTimeout(async () => {
      const canvas = canvasRef.current;
      const canvasImage = await html2canvas(canvas as any);
      const dataUrl = canvasImage.toDataURL();
      setStateImage(dataUrl);
      setShowConfirmation(true);
      // setIsRotating(true);
    }, 100);
  };

  // Create a state object to store the form field values

  // Handle changes in the size form fields

  // description dialogs
  // const [selectedTexture, setSelectedTexture] = useState({});

  // parse part title

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);

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

  const handleRetakeTour = () => {
    setShowTour(true);
  };

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
      </>

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={Number(total)}
          readyBy={selectedClothing?.readyIn || 0}
          // weight={selectedClothing?.weight}
          name={selectedClothing?.name || ''}
          // selectedParts={
          //   notAll.includes(selectedClothing?.name as string)
          //     ? []
          //     : selectedParts || []
          // }
          // selectedPrintOn={{
          //   isColor:
          //     selectedPart !== null
          //       ? state.texture[selectedPart] === null
          //       : true,
          //   item: selectedPrintOn || '',
          // }}
          // uploadedImageLeft={firebaseImageLeft}
          // uploadedImageRight={firebaseImageRight}
          textLeft={enteredTextLeft || ''}
          textRight={enteredTextRight || ''}
          setShowConfirmation={setShowConfirmation}
          // selectedSize={
          //   selectedClothing?.sizeOptions?.find(
          //     (option) => option.value === selectedSize,
          //   )?.label || ''
          // }
          modelImage={stateImage}
          customSizeValues={{}}

          // height={height}
          // gender={gender}
          // beadType={beadType}
        />
      ) : (
        <>
          <div className="main-space pb-10">
            <h3 className="text-center text-sm lg:text-2xl mt-3 mb-2 capitalize font-normal text-gray-600 pt-3">
              Customizing {selectedClothing?.name}
            </h3>
            <div className=" justify-content-center hidden">
              <button
                className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className=" flex flex-col container my-3 ">
              <div className="right-panel h-[30rem] lg:h-[80vh]">
                <Canvas
                  camera={{ position: [0, 0, selectedClothing?.myZoom || 5] }}
                  ref={canvasRef}
                  gl={{ preserveDrawingBuffer: true }}
                  className="main-canvas h-full resize-right-panel"
                >
                  {displayImage && (
                    <Image
                      scale={selectedClothing?.scale || 1}
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
                        // textLeftOrientation={textLeftOrientation}
                        // textRightOrientation={textRightOrientation}

                        ImprintTextPosition={ImprintTextPosition as any}
                        hideRightText={
                          selectedClothing?.name === 'Beads Bracelet'
                        }
                      />
                      <HtmlImageComponent
                        ImprintTextPosition={ImprintTextPosition}
                        imageLeft={uploadedImageLeft || ''}
                        imageRight={uploadedImageRight || ''}
                        hideLogo={selectedClothing?.name === 'Beads Bracelet'}
                        hideRightText={
                          selectedClothing?.name === 'Beads Bracelet'
                        }
                        textColor={textColor}
                      />
                    </>
                  )}
                </Canvas>
              </div>

              <div className="px-4 pt-4 w-full bg-gray-50 rounded-lg">
                {/* test text inprinting */}
                <h5 className="text-lg font-semibold text-gray-900 mb-4">
                  Imprint text on model
                </h5>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <InputText
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        selectedClothing?.name === 'Beads Bracelet'
                          ? 'Text Here'
                          : 'imprint on left side...'
                      }
                      value={enteredTextLeft}
                      onChange={(e) => setEnteredTextLeft(e.target.value)}
                    />
                    {selectedClothing?.name === noSpinFor[0] ? null : (
                      <InputText
                        type="text"
                        placeholder="imprint on right side..."
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={enteredTextRight}
                        onChange={(e) => setEnteredTextRight(e.target.value)}
                      />
                    )}
                  </div>
                  <div
                    className="flex items-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                    onClick={(e) => (textEditRef.current as any)?.toggle(e)}
                  >
                    <span>Edit Text</span>
                    <i className="pi pi-chevron-right text-sm"></i>
                  </div>
                  <OverlayPanel
                    showCloseIcon
                    ref={textEditRef}
                    className="w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
                  >
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-sm font-semibold text-gray-900 mb-2">
                          Color
                        </h6>
                        {selectedClothing?.name === 'Beads Bracelet' ? (
                          <span className="text-gray-500">N/A</span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {colorOptions
                              .slice(0, 6)
                              .map((colorOption, index) => (
                                <button
                                  key={index}
                                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    textColor === colorOption.label
                                      ? 'border-gray-800 scale-110'
                                      : 'border-gray-300 hover:border-gray-500'
                                  }`}
                                  onClick={() =>
                                    setTextColor(colorOption.label)
                                  }
                                  style={{
                                    backgroundColor: colorOption.color,
                                  }}
                                  title={colorOption.label}
                                />
                              ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <h6 className="text-sm font-semibold text-gray-900 mb-2">
                          Style
                        </h6>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-700">
                            {fontFamily}
                          </span>
                          <button
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            onClick={handleChangeFont}
                          >
                            <i className="pi pi-sync text-sm"></i>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h6 className="text-sm font-semibold text-gray-900 mb-2">
                          Size{' '}
                          {selectedClothing?.name === 'Beads Bracelet'
                            ? null
                            : '(Left)'}
                        </h6>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                            onClick={decreaseFontSizeLeft}
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                            {fontSizeLeft as number}
                          </span>
                          <button
                            className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                            onClick={increaseFontSizeLeft}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {selectedClothing?.name === 'Beads Bracelet' ? null : (
                        <div>
                          <h6 className="text-sm font-semibold text-gray-900 mb-2">
                            Size (Right)
                          </h6>
                          <div className="flex items-center justify-center gap-3">
                            <button
                              className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                              onClick={decreaseFontSizeRight}
                            >
                              -
                            </button>
                            <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                              {fontSizeRight as number}
                            </span>
                            <button
                              className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                              onClick={increaseFontSizeRight}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </OverlayPanel>
                  {selectedClothing?.name === noSpinFor[0] ? null : (
                    <div className="mt-6">
                      <h5 className="text-lg font-semibold text-gray-900 mb-3">
                        Imprint images or Logos
                      </h5>
                      <div className="space-y-3">
                        <ImageUpload
                          labelLeft={'Upload for left'}
                          labelRight={'Upload for right'}
                          hideRightButton={
                            selectedClothing?.name ===
                            'One-Sided Logo, Two-Sided Text Sash'
                          }
                          onImageUploadLeft={handleImageUploadLeft}
                          onImageUploadRight={handleImageUploadRight}
                          toastRef={toastRef}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between lg:mt-5">
            <span className="m-3 expect-to-be-ready">
              Estimated time to make this order:{' '}
              <span className="customize-focus">
                {selectedClothing?.readyIn} days{' '}
              </span>
            </span>

            <p className="price-text m-3">
              <span className="expect-to-be-ready">Price:</span>{' '}
              <span className="customize-focus">
                {currencySymbol}
                {total}
              </span>
            </p>

            <p className="complete m-2">
              <button
                className="btn btn-success text-white"
                onClick={captureCanvasAsImage}
              >
                Complete
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ConfiguratorUnisexSpecial;
