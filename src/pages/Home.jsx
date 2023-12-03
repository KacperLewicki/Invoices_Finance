import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductsList } from "../components/productList/ProductList";
import { ProductFilters } from "../components/productFilters/ProductFilters";
import { ManufacturerFilters } from "../components/manufacturerFilters/ManufacturerFilters";
import { MANUFACTURER_ARRAY_SEARCH_PARAM } from "../components/manufacturerFilters/consts";
import { IS_SALABLE_SEARCH_PARAM, AVAILABLE_VALUE } from "../components/productFilters/consts";
import "./Home.css";

export const Home = () => {
  const [searchParams] = useSearchParams();
  const { products, isError, isLoading } = useProducts();

  const availabilityParam = searchParams.get(IS_SALABLE_SEARCH_PARAM) ?? AVAILABLE_VALUE;
  const manufacturerArrayParam = searchParams.getAll(MANUFACTURER_ARRAY_SEARCH_PARAM);

  let filteredProducts = products.filter(product => product.is_salable === parseInt(availabilityParam));

  if (manufacturerArrayParam.length) {
    filteredProducts = filteredProducts.filter(product => manufacturerArrayParam.includes(product.manufacturer));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to fetch products...</div>;
  }

  return (
    <div className="App">
      <h1 className='Home-h1'>Shop App</h1>
      <h2 className="Home-h2">Filters:</h2>
      <ManufacturerFilters />
      <ProductFilters />
      <ProductsList products={filteredProducts}/>
    </div>
  );
}