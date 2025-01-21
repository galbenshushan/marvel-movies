import { useEffect } from "react";
import { useMarvel } from "./useMarvel";

interface UseScrollProps {
  fetchRequest: () => void;
}

const useScroll = ({ fetchRequest }: UseScrollProps) => {
  const { loading } = useMarvel();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading) {
        fetchRequest();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, fetchRequest]);
};

export default useScroll;
