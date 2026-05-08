"use client";

import { useContext } from "react";

import { SearchContext } from "@/features/device/providers/search-provider";

export default function useSearchBar() {
  return useContext(SearchContext);
}
