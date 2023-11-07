import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import Homepage from "./routes/Homepage";
import AuthContext from "./context/authContext";
import CartContext from "./context/cartContext";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import Favorites from "./routes/Favorites";
import Coffees from "./routes/Coffees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/products/:id",
    element: <Product />
  },
  { path: "/cart", element: <Cart /> },
  { path: "/favorites", element: <Favorites /> },
  {
    path: "/coffees",
    element: <Coffees />
  },
  {
    path: "*",
    element: <div>Not found</div>
  }
]);

type AppProps = {
  showNavbar: boolean;
};

function App({ showNavbar }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <CartContext>
          <AuthContext>
            {showNavbar && <NavBar />}
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </AuthContext>
        </CartContext>
      </ChakraProvider>
    </>
  );
}

export default App;
