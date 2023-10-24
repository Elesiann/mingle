import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import Homepage from "./routes/Homepage";
import AuthContext from "./context/authContext";

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
      <AuthContext>
        {showNavbar && <NavBar />}
        <RouterProvider router={router} />
      </AuthContext>
    </>
  );
}

export default App;
