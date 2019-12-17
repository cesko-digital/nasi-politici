import { useState, useCallback } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
	const reset = useCallback(() => setValue(''), [setValue])
  return {
    value,
    setValue,
    reset,
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};
