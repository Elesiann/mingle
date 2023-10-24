import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import Homepage from "./routes/Homepage";

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
      {showNavbar && <NavBar />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
