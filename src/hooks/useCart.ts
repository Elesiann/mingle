import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { ProductProps } from "../components/Product";

export const useCartUtils = () => {
  const cartContext = useContext(CartContext);

  const isFavorite = (id: number) =>
    cartContext.favorites.some((prod) => prod.id === id);

  const isInCart = (id: number) =>
    cartContext.cart.some((prod) => prod.id === id);

  const handleAddToFavorite = (product: ProductProps) => {
    cartContext.setFavorites(product);
  };

  const handleAddToCart = (product: ProductProps) => {
    cartContext.setCart(product);
  };

  const handleRemoveFromFavorites = (product: ProductProps) => {
    return cartContext.handleRemoveFromFavorites(product);
  };

  const handleRemoveFromCart = (product: ProductProps) => {
    return cartContext.handleRemoveFromCart(product);
  };

  return {
    isFavorite,
    isInCart,
    handleAddToFavorite,
    handleAddToCart,
    handleRemoveFromFavorites,
    handleRemoveFromCart
  };
};
