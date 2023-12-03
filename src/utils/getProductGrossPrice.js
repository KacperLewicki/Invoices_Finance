export const getProductGrossPrice = ({price, tax, promotion_discount}) => {
    const netPriceAfterPromotion = price - (price * (promotion_discount / 100));
    const grossPrice = netPriceAfterPromotion * (1 + tax / 100);
    return grossPrice.toFixed(2);
};

