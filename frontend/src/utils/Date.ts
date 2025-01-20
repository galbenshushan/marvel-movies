import { format } from "date-fns";

export const formatDateToText = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy");
