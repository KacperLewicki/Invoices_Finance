import { useSearchParams } from "react-router-dom";

export function useMultipleCheckbox(arrayParam) {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrayParamValues = searchParams.getAll(arrayParam);

  const handleOnChange = (checkboxValue) => {

    setSearchParams(prevSearchParams => {
      const prevArrayParam = prevSearchParams.getAll(arrayParam);
      const isUncheckChange = prevArrayParam.includes(checkboxValue);

      if (isUncheckChange) {
        prevSearchParams.delete(arrayParam);

        prevArrayParam.forEach(item => {
          const isUncheckedItem = item === checkboxValue;

          if (isUncheckedItem) {
            return;
          }

          if (!prevSearchParams.has(arrayParam)) {
            prevSearchParams.set(arrayParam, item);
            return;
          }

          prevSearchParams.append(arrayParam, item);
        });

        return prevSearchParams;
      }

      if (!prevArrayParam.length) {
        prevSearchParams.set(arrayParam, checkboxValue);
        return prevSearchParams;
      }

      prevSearchParams.append(arrayParam, checkboxValue);
      return prevSearchParams;
    });
  };

  const isCheckboxChecked = (checkboxValue) => {
    return arrayParamValues.includes(checkboxValue);
  };

  return {
    handleOnChange,
    isCheckboxChecked
  };
}