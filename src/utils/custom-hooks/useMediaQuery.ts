import { useState, useEffect } from "react";

export default function useMediaQuery(query: string): boolean {
  const [isMatches, setIsMatches] = useState(false);

  useEffect(() => {
    const matchResult = window.matchMedia(query);
    const onChange = () => {
      setIsMatches(matchResult.matches);
    };

    matchResult.addEventListener("change", onChange);

    //set the initial value
    onChange();

    return () => {
      matchResult.removeEventListener("change", onChange);
    };
  }, [query]);

  return isMatches;
}
