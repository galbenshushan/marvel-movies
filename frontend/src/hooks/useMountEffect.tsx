import { useEffect, useRef, DependencyList } from "react";

const useMountEffect = (callback: () => void, dependencies: DependencyList) => {
  // prevent useEffect from running twice
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callback();
  }, dependencies);
};

export default useMountEffect;
