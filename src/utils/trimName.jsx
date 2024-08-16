export const trimName = (name) => {
  name = name.trim();

  const words = name.split(" ");
  const firstLetters = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return firstLetters;
};
