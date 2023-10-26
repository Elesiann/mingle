import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import Homepage from "./routes/Homepage";
import AuthContext from "./context/authContext";
import CartContext from "./context/cartContext";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  }
]);

type AppProps = {
  showNavbar: boolean;
};

function App({ showNavbar }: AppProps) {
  return (
    <>
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
    </>
  );
}

export default App;
