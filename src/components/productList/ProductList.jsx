import React from 'react';
import { Product } from './Product/Product';
import './ProductList.css'

export const ProductsList = ({ products }) => {
  return (
    <div className='Product-list__wrapper'>
        <h1 className='Product-list__title'>Products List</h1>
        <ul className='Product-list'>
          {products.map(product => (
            <Product key={product.entity_id} product={product} />
          ))}
        </ul>
    </div>
  );
};

