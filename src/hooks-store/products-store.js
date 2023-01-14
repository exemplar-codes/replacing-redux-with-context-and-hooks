import { initStore } from "./store";

export const PRODUCTS_STORE_KEY = "products"; // 11. *slice* key

export const TOGGLE_FAV = 'TOGGLE_FAV'; // 12. actionId

const configureStore = () => {
  const actions = {
    [TOGGLE_FAV]: (state, productId) => {
      // FIMXE-urgent argument in actions?
      const prodIndex = state.products.findIndex((p) => p.id === productId);
      const newFavStatus = !state.products[prodIndex].isFavorite;
      const updatedProducts = [...state.products];
      updatedProducts[prodIndex] = {
        ...state.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return {
        ...state,
        products: updatedProducts,
      };
    },
  };

  initStore(actions, {
    [PRODUCTS_STORE_KEY]: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
};

export default configureStore; // 13.
