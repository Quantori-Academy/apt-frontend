import { useRef, useState } from "react";

export const useFieldVisibility = () => {
  const [isFieldShown, setFieldIsShown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleFieldVisibility = () => {
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      setFieldIsShown((prev) => !prev);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          inputRef.current.focus();
        }
      }, 0);
    }
  };
  return { isFieldShown, toggleFieldVisibility, inputRef };
};
