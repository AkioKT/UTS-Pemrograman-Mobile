export default function GetStorageKey(category) {
  return `levels_${category.toLowerCase()}`;
}
