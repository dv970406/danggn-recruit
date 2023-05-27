"use client";

import React from "react";
import { reactQueryClient } from "../clients/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IReactQuery {
  children: React.ReactNode;
}

export default function ReactQuery({ children }: IReactQuery) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
