import { useCallback, useState } from "react";

const useStorage = (key) => {
  const [state, setState] = useState(localStorage.getItem(key));

  const set = useCallback(newValue => {
    localStorage.setItem(key, newValue);
    setState(newValue);
  }, [key]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setState(undefined);
  }, [key]);
  
  return [state, set, remove];
}

export default useStorage;
