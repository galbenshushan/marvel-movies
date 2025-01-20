export const getGenreName = (id: number): string => {
    switch (id) {
      case 12:
        return "Adventure";
      case 28:
        return "Action";
      case 878:
        return "Sci-Fi";
      default:
        return "Unknown";
    }
  };