/**
 * Shared HTTP client — extend with base URL, interceptors, auth headers, etc.
 */
export function getPublicBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "";
}
