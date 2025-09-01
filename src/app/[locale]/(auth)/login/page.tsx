"use client";

import { LoginForm } from "@/components/auth/login-form";


import * as React from "react";

const Page: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col flex-1 bg-gray-200 min-h-screen gap-4">
      
      <LoginForm />
    </div>
  );
};

export default Page;
