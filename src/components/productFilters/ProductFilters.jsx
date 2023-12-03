import { useSearchParams } from "react-router-dom";
import { IS_SALABLE_SEARCH_PARAM, INACCESSIBLE_VALUE } from "./consts";
import "./ProductFilters.css";
export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const availabilityParam = searchParams.get(IS_SALABLE_SEARCH_PARAM);

  const isInaccessibleChecked = availabilityParam === INACCESSIBLE_VALUE;

  const onCheckboxChange = (event) => {
    if (!event.target.checked) {
        return;
    }

    setSearchParams(prevSearchParams => {
      if (isInaccessibleChecked) {
        prevSearchParams.delete(IS_SALABLE_SEARCH_PARAM);
      } else {
        prevSearchParams.set(IS_SALABLE_SEARCH_PARAM, INACCESSIBLE_VALUE);
      }
      return prevSearchParams;
    });
  };

  return (
    <div className="ProductFilters">
      <h3 className="ProductFilters-h3">Products:</h3>
      <label className="ProductFilters-label">
        <input
          className="ProductFilters-input"
          type="checkbox"
          checked={availabilityParam === null}
          onChange={onCheckboxChange}
        />
        Available
      </label>
      <label className="ProductFilters-label">
        <input 
          className="ProductFilters-input"
          type="checkbox"
          checked={isInaccessibleChecked}
          onChange={onCheckboxChange}
        />
        Inaccessible
      </label>
    </div>
  );
};