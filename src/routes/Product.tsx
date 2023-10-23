import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return <div></div>;
};

export default Product;
