export const formatText = (string) => {
  string = string.charAt(0).toUpperCase() + string.slice(1);
  if (string.includes("_")) {
    string = string.replace("_", " ");
  }
  return string;
};
