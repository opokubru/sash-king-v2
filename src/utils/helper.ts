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


