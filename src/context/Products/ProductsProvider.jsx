import { useState, useEffect, useRef } from "react";
import { ProductsContext } from "./ProductsContext";
import { ProductsApi } from "../../api/Products";

export function ProductsProvider({children}) {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFetchingFirstTime = useRef(false);

  useEffect(() => {
    if (isFetchingFirstTime.current) {
      return;
    }

    const fetchData = async () => {
      isFetchingFirstTime.current = true;

      try {
        setIsLoading(true);
        const products = await ProductsApi.getAll();
        setProducts(products);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{products, isError, isLoading}}>
      {children}
    </ProductsContext.Provider>
  )
}

