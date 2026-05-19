const formatPrice = {
  /**
   * @function usd
   * @param {number} ammount
   * @returns {string}
   */
  usd(ammount) {
    return "$" + ammount / 100;
  }
};

const intervalToText = Object.freeze({
  month: "per month"
});

export { formatPrice, intervalToText };
