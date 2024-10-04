import { useRef, useState } from "react";

export const usePasswordVisibility = () => {
  const [isPasswordShown, setPasswordIsShown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePassVisibility = () => {
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      setPasswordIsShown((prev) => !prev);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          inputRef.current.focus();
        }
      }, 0);
    }
  };
  return { isPasswordShown, handlePassVisibility, inputRef };
};
