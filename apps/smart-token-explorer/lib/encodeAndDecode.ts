export function encodeToSafeBase64(input: string): string {
  return btoa(encodeURIComponent(input))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeFromSafeBase64(input: string): string | null {
  try {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return decodeURIComponent(atob(base64));
  } catch (error) {
    console.error("Error decoding Base64 string:", error);
    return null;
  }
}

