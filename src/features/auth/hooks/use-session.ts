"use client";

import { useState } from "react";

/** Placeholder session hook — wire to your auth provider. */
export function useSession() {
  const [user, setUser] = useState<null | { id: string }>(null);
  return { user, setUser };
}
