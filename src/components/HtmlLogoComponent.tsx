import { Html } from '@react-three/drei';
import { separateWordsWithLineBreak } from '@/utils/helper';
import { useEffect, useState } from 'react';

const HtmlLogoComponent = ({
  ImprintTextPosition,
  hideRightText,
  imageLeft,
  turn_to_back,
  imageRight,
  width,
  height,
  translateY,
  translateX,
}) => {
  useEffect(() => {
    setStableImageLeft('');

    /// timetout 5 secons and set the image
    setTimeout(() => {
      if (turn_to_back) {
        setStableImageLeft(imageRight);
      } else {
        setStableImageLeft(imageLeft);
      }
    }, 1000);
  }, [turn_to_back]);

  useEffect(() => {
    if (turn_to_back) {
      setStableImageLeft(imageRight);
    } else {
      setStableImageLeft(imageLeft);
    }
  }, [imageLeft, imageRight]);

  const [stableImageLeft, setStableImageLeft] = useState(null);

  return (
    <Html style={{ zIndex: 1 }}>
      <div
        className="overlay"
        style={{
          position: 'absolute',
          transform: `translate(${translateX}, ${translateY})`,
          fontSize: '0.5rem',
          lineHeight: '0.7rem',
          width: width,
          height: height,
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
          textTransform: 'uppercase',
          backgroundImage: `url(${stableImageLeft})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: stableImageLeft !== null ? 1 : 0.3,
        }}
        dangerouslySetInnerHTML={{
          __html:
            stableImageLeft !== null
              ? ''
              : separateWordsWithLineBreak('LOGO HERE'),
        }}
      />

      {/* {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image?.top})`,
            fontSize: "0.5rem",
            lineHeight: "0.7rem",
            width:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.width
                : "2rem",
            height:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.height
                : "2rem",
            wordWrap: "break-word", // Enable word wrapping for long words
            overflow: "hidden", // Ensure text doesn't overflow its container
            textTransform: "uppercase",

            backgroundImage: `url(${imageRight})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: imageRight !== null ? 1 : 0.3,
          }}
          dangerouslySetInnerHTML={{
            __html:
              imageRight !== null
                ? ""
                : separateWordsWithLineBreak("LOGO HERE"),
          }}
        />
      )} */}
    </Html>
  );
};

export default HtmlLogoComponent;
