"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import PageLoader from "@/components/feedback/page-loader";

const SignUpPage = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrent();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return <PageLoader />;
  }

  return <SignUpCard />;
};

export default SignUpPage;
