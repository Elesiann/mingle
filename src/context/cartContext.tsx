import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ProductProps } from "../components/Product";
import { useGetLocalStorage } from "../hooks/useLocalstorage";
import { toast } from "react-toastify";

interface CartContextProps {
  favorites: ProductProps[];
  cart: ProductProps[];
  setFavorites: (product: ProductProps) => void;
  setCart: (product: ProductProps) => void;
  handleRemoveFromFavorites: (product: ProductProps) => ProductProps[];
  handleRemoveFromCart: (product: ProductProps) => ProductProps[];
  setOpenNavbar: (value: "user" | "login" | "") => void;
  openNavbar: "user" | "login" | "";
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

const Cart = ({ children }: PropsWithChildren) => {
  const [openNavbar, setOpenNavbar] = useState<"user" | "login" | "">("");
  const favoritesStorage = useGetLocalStorage("favorites");
  const cartStorage = useGetLocalStorage("cart");
  const user = useGetLocalStorage("user");
  const [favorites, setFavorites] = useState<ProductProps[]>(
    favoritesStorage || []
  );
  const [cart, setCart] = useState<ProductProps[]>(cartStorage || []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [favorites, cart]);

  const handleAddToFavorites = (product: ProductProps) => {
    if (!user) {
      setOpenNavbar("login");
      return toast.error(
        "Você precisa estar logado para adicionar aos favoritos"
      );
    }
    if (favorites.some((prod) => prod.id === product.id)) {
      const newFavorites = favorites.filter((prod) => prod.id !== product.id);
      setFavorites(newFavorites);
      return;
    }
    setFavorites([...favorites, product]);
  };

  const handleAddToCart = (product: ProductProps) => {
    if (!user) {
      setOpenNavbar("login");
      return toast.error(
        "Você precisa estar logado para adicionar ao carrinho"
      );
    }
    if (cart.some((prod) => prod.id === product.id)) {
      const newCart = cart.filter((prod) => prod.id !== product.id);
      setCart(newCart);
      return;
    }
    setCart([...cart, product]);
  };

  const handleRemoveFromFavorites = (product: ProductProps) => {
    const newFavorites = favorites.filter((prod) => prod.id !== product.id);
    setFavorites(newFavorites);

    return newFavorites;
  };

  const handleRemoveFromCart = (product: ProductProps) => {
    const newCart = cart.filter((prod) => prod.id !== product.id);
    setCart(newCart);

    return newCart;
  };

  const context = {
    favorites,
    cart,
    setFavorites: handleAddToFavorites,
    setCart: handleAddToCart,
    handleRemoveFromFavorites,
    handleRemoveFromCart,
    setOpenNavbar,
    openNavbar
  };
  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export default Cart;
