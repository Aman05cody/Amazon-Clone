const CENTS_TO_RUPEES_CONVERSION_RATE = 83;

/**
 * Converts a price from USD cents to Indian Rupees and formats it as a string.
 * e.g. 2095 cents -> ₹1,738.85
 * @param {number} priceCents - The price in USD cents.
 * @returns {string} The formatted price in INR.
 */
export function formatCurrency(priceCents) {
  const priceInRupees = (priceCents / 100) * CENTS_TO_RUPEES_CONVERSION_RATE;
  
  // Use Intl.NumberFormat for proper currency formatting.
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(priceInRupees);
}