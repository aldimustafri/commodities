/* eslint-disable radix */
/* eslint-disable no-param-reassign */
const DollarFormatter = (amount) => {
  if (amount) { amount = `$ ${parseInt(amount * 0.00007)}`; }
  return amount;
};

export default DollarFormatter;