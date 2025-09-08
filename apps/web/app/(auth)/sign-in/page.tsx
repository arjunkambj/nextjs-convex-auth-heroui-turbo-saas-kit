"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@heroui/react";

export default function SignIn() {
  const { signIn } = useAuthActions();

  return (
    <Button onPress={() => void signIn("google")}>Sign in with Google</Button>
  );
}
