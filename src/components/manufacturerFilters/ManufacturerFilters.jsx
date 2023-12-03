import React, { useContext } from "react";
import { ProductsContext } from "../../context/Products/ProductsContext";
import { useMultipleCheckbox } from "../../hooks/useMultipleCheckbox";
import { MANUFACTURER_ARRAY_SEARCH_PARAM } from "./consts";
import "./ManufacturerFilters.css";
export const ManufacturerFilters = () => {
  const { products } = useContext(ProductsContext);
  const { handleOnChange, isCheckboxChecked } = useMultipleCheckbox(MANUFACTURER_ARRAY_SEARCH_PARAM);

  const manufacturerTypes = [...new Set(products.map(product => product.manufacturer))];

  return (
    <div className="manufacturer-filters">
      <h3 className="manufacturer-filters-h3">Manufacturers:</h3>
      {manufacturerTypes.map(manufacturer => (
        <label className="manufacturer-filters-label" key={manufacturer}>
          <input
            className="manufacturer-filters-input"
            type="checkbox"
            checked={isCheckboxChecked(manufacturer)}
            onChange={() => handleOnChange(manufacturer)}
          />
          {manufacturer}
        </label>
      ))}
    </div>
  );
};