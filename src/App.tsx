import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NavBar from "./components/Navbar";
import AuthContext from "./context/authContext";
import CartContext from "./context/cartContext";
import Cart from "./routes/Cart";
import Coffees from "./routes/Coffees";
import Drinks from "./routes/Drinks";
import Equipments from "./routes/Equipments";
import Favorites from "./routes/Favorites";
import FindUs from "./routes/FindUs";
import Homepage from "./routes/Homepage";
import Product from "./routes/Product";

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
            <Router>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/coffees" element={<Coffees />} />
                <Route path="/equipments" element={<Equipments />} />
                <Route path="/drinks" element={<Drinks />} />
                <Route path="/about" element={<FindUs />} />
                <Route path="*" element={<div>Not found</div>} />
              </Routes>
            </Router>
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
