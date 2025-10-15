import { Dialog } from 'primereact/dialog';
import React, { useMemo } from 'react';
import { IconError } from './Icons';

const maleVid = 'https://www.youtube.com/embed/I8vAfmGWaP8?si=0udacOCSjGZ7pIN9';
const femaleVid =
  'https://www.youtube.com/embed/DJaaOOyfvm0?si=5MOyLeuWZqmlBLNf';
const hairVid = 'https://www.youtube.com/embed/2-oFVmNZp6o?si=w1C8qTwAktJpVrMu';
const bikiniVid =
  'https://www.youtube.com/embed/8W_oMkqAKtA?si=wFAZLJyuznc4TMOr';
const bangleVid =
  'https://www.youtube.com/embed/BCXxVOr4Xxc?si=jxtNZrvAUfE4U5MG';
const sashVid = 'https://www.youtube.com/embed/XiGbNICsN-U?si=RBuE_lMA7IJytCsT';
const nailVid = 'https://www.youtube.com/embed/FOxsD3DoylA?si=n7XBJMmB4_JfWeEP';

const TakeTour = ({ isOpen, onClose, type }: any) => {
  const videoUrl = useMemo(() => {
    if (type === 'male') {
      return maleVid;
    }

    if (type === 'female') {
      return femaleVid;
    }

    if (type === 'bikini') {
      return bikiniVid;
    }

    if (type === 'hair') {
      return hairVid;
    }

    if (type === 'bangle') {
      return bangleVid;
    }

    if (type === 'nails') {
      return nailVid;
    }

    if (type === 'sash') {
      return sashVid;
    }
  }, [type]);

  return (
    <Dialog
      //   header="Welcome to the 3D Customization!"
      visible={isOpen}
      className="col-12 col-sm-6"
      onHide={onClose}
      dismissableMask={true}
    >
      <div className="video-container">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="tutorial"
            className="item-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="d-flex align-items-center justify-content-center flex-column">
            <p>{IconError}</p>
            <p>Sorry, no video available for this item.</p>
          </p>
        )}
      </div>
    </Dialog>
  );
};

export default TakeTour;
