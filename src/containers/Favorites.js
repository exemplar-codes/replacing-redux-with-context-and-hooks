import React from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import { PRODUCTS_STORE_KEY } from '../hooks-store/products-store';
import useCustomStore from '../hooks-store/store';
import './Products.css';

const Favorites = props => {
  const customStoreState = useCustomStore()[0]; // 18. read global store state
  const favoriteProducts = customStoreState[PRODUCTS_STORE_KEY]?.filter(p => p.isFavorite);

  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
