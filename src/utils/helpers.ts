export const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
