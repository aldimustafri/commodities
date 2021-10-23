/* eslint-disable radix */
/* eslint-disable no-param-reassign */
const CurrencyFormatter = (amount) => {
  if (amount) { amount = `Rp ${parseInt(amount).toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, "$1.")}`; }
  return amount;
};

export default CurrencyFormatter;
