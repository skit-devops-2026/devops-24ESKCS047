export function isValidPostText(text) {
  return typeof text === "string" && text.trim().length > 0;
}
