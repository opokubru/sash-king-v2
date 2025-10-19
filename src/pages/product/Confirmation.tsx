// import React, { useEffect, useRef, useState } from 'react';

const Confirmation = ({
  currencySymbol,
  total,
  readyBy,
  name,
}: // selectedParts,
// selectedPrintOn,
// textLeft,
// textRight,
// selectedSize,
// modelImage,
// customSizeValues,
{
  currencySymbol: string;
  total: number;
  readyBy: number;
  name: string;
  // selectedParts: { name: string; color: string; texture: string }[];
  // selectedPrintOn: { isColor: boolean; item: string };
  textLeft: string;
  textRight: string;
  // selectedSize: string;
  modelImage: string;
  customSizeValues: { [key: string]: number };
  setShowConfirmation: (show: boolean) => void;
}) => {
  return (
    <div>
      <h1>Confirmation</h1>
      <p>Currency: {currencySymbol}</p>
      <p>Total: {total}</p>
      <p>Ready By: {readyBy}</p>
      <p>Name: {name}</p>
      {/* <p>Selected Parts: {selectedParts.map((part) => part.name).join(', ')}</p> */}
    </div>
  );
};

export default Confirmation;
