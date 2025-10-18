/* eslint-disable @typescript-eslint/no-explicit-any */


export const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) =>
	['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();



// currencySymbols.ts
const currencySymbols: { [key: string]: string } = {
	USD: "$",
	EUR: "€",
	GBP: "£",
	JPY: "¥",
	GHS: "₵", // Ghanaian Cedi
	// Add more currencies as needed
  };
  
  export function getCurrencySymbol(currencyCode: string): string {
	return currencySymbols[currencyCode.toUpperCase()];
  }

  export const parseToMoney = (value: number | undefined) => {
	if (!value) return 0;
	if (isNaN(value)) return null;
  
return Number(value).toLocaleString(undefined, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
  };


  export const isMobile = window.innerWidth <= 767;


  export const readFileAsDataURL = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
  
	  reader.onloadend = () => {
		resolve(reader.result);
	  };
  
	  reader.onerror = () => {
		reject(reader.error);
	  };
  
	  reader.readAsDataURL(file);
	});
  };
  
  export const uploadToStorage = async (dataURL: string, bucket: string): Promise<string> => {
	try {
	  const storageRef = ref(storage, `${bucket}/${Date.now()}.png`);
  
	  await uploadString(storageRef, dataURL, 'data_url');
  
	  // Get the download URL of the uploaded image
	  const downloadURL = await getDownloadURL(storageRef);
  
	  // Return the download URL
	  return downloadURL;
	} catch (error) {
	  console.error('Upload failed:', error);
	  throw error; // Re-throw the error to handle it where uploadToStorage is called.
	}
  };


  export const separateWordsWithLineBreak = (text: string): string => {
	// Split the text into an array of words
	const wordsArray = text?.split(' ');
	// Insert <br> after each word and join them back into a string
	const textWithLineBreak = wordsArray?.join('<br>');
	return textWithLineBreak;
  };

