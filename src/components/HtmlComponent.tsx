import { Html } from '@react-three/drei';
import { separateWordsWithLineBreak } from '@/utils/helper';

const HtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSizeleft,
  textSizeRight,
  fontFamily,
  textLeftOrientation,
  textRightOrientation,
  ImprintTextPosition,
  hideRightText,
}) => {
  return (
    <Html style={{ zIndex: 1 }}>
      <div
        className="overlay"
        style={{
          position: 'absolute',
          transform: `translate(${ImprintTextPosition?.left?.left}, ${ImprintTextPosition.left?.top})`,
          color: textColor,
          fontSize: textSizeleft,
          width: ImprintTextPosition?.left?.width,
          height: ImprintTextPosition?.left?.height,
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
          textTransform: 'uppercase',
          lineHeight: `${ImprintTextPosition?.left?.lineHeight || '2.8rem'}  `,
          fontFamily: fontFamily,
          writingMode: `${
            textLeftOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb'
          }`,
          opacity: textLeft !== '' ? 1 : 0.3,
        }}
        dangerouslySetInnerHTML={{
          __html: hideRightText
            ? textLeft !== ''
              ? textLeft
              : 'TEXT HERE'
            : separateWordsWithLineBreak(
                textLeft !== '' ? textLeft : 'TEXT HERE',
              ),
        }}
      />

      {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: 'absolute',
            transform: `translate(${ImprintTextPosition.right.left}, ${ImprintTextPosition.right?.top})`,
            color: textColor,
            fontSize: textSizeRight,
            width: ImprintTextPosition?.right.width,
            height: ImprintTextPosition?.right.height,
            lineHeight: `${
              ImprintTextPosition?.right?.lineHeight || '2.8rem'
            }  `,
            wordWrap: 'break-word', // Enable word wrapping for long words
            overflow: 'hidden', // Ensure text doesn't overflow its container
            textTransform: 'uppercase',
            fontFamily: fontFamily,
            writingMode: `${
              textRightOrientation === 'vertical'
                ? 'vertical-rl'
                : 'horizontal-tb'
            }`,
            opacity: textRight !== '' ? 1 : 0.3,
            zIndex: 0.8,
            lineHeight: ImprintTextPosition.right?.lineHeight,
          }}
          dangerouslySetInnerHTML={{
            __html: separateWordsWithLineBreak(
              textRight !== '' ? textRight : 'TEXT HERE',
            ),
          }}
        />
      )}
    </Html>
  );
};

export default HtmlComponent;
