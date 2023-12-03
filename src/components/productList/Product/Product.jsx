import React from 'react';
import { getProductGrossPrice } from '../../../utils/getProductGrossPrice';
import { colors } from '../../../utils/colors';
import './Product.css';

export const Product = ({ product }) => {
  const availabilityStatus = !!product.is_salable ? 'available' : 'inaccessible';
  const isNewProduct = !!product.new_product;


  const getBorderColor = () => {
    
    const isAvailable = availabilityStatus === 'available';

    return isAvailable ? colors.GREEN : colors.RED;
  }

  return (
    <li
      className="Product"
      style={{
        borderColor: getBorderColor()
      }}
    >
      <h2 className="Product__name">Product: {product.name}</h2>
      <p className="Product__details">Description: {product.description}</p>
      <p className="Product__details">Manufacturer: {product.manufacturer}</p>
      <p className="Product__details">Availabilty: {availabilityStatus}</p>
      <p className="Product__details">Net Price: {product.price}</p>
      <p className="Product__details">{`Gross Price: ${getProductGrossPrice(product)}`}</p>
      {isNewProduct &&
        <div className='Product__new-product-wrapper'>
          <p style={{color: colors.RED}} className='Product__new-product'>
            New Product !!!!!!
          </p>
         </div>}
    </li>
  );
}
