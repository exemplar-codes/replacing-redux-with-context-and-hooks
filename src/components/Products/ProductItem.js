import React from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
import useCustomStore from '../../hooks-store/store';
import { TOGGLE_FAV } from '../../hooks-store/products-store';

const ProductItem = React.memo((props) => {
  console.log("Re-render");
  // 16. add nothing to global state slice, but add a listener, and get dispatch.
  const customStoreDispatch = useCustomStore(false)[1];

  const toggleFavHandler = () => {
    customStoreDispatch(TOGGLE_FAV, props.id); // 17. dispatch action
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className='product-item'>
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
