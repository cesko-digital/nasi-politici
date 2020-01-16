import { useState, useCallback } from "react";

export interface BindInput {
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
}

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
	const reset = useCallback(() => setValue(''), [setValue])
  return {
    value,
    setValue,
    reset,
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setValue(event.target.value);
      }
    }
  };
};
