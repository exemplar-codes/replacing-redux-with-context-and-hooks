import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import { PRODUCTS_STORE_KEY } from '../hooks-store/products-store';
import useCustomStore from '../hooks-store/store';
import './Products.css';

const Products = (props) => {
  const customStoreState = useCustomStore()[0]; // 14. read global store state
  const productList = customStoreState[PRODUCTS_STORE_KEY]; // 15. keyname for global state "slice"

  return (
    <ul className='products-list'>
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
