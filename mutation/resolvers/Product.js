module.exports = {
  priceWithDiscount(product) {
    if (product.discount) {
      return (product.price * ((100 - product.discount) / 100)).toFixed(2);
    } else {
      return product.price;
    }
  },
};
