"use client";

import { createContext, useState } from "react";

import { type DebouncedState, useDebouncedCallback } from "use-debounce";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchContextProps = {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: DebouncedState<(value: string) => void>;
  handleReset: () => void;
};

export const SearchContext = createContext<SearchContextProps | null>(null);

export default function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const pathname = usePathname();

  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set("q", value.trim().toLowerCase());
    else params.delete("q");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleReset = () => {
    setQuery("");
  };

  const contextValue = {
    query,
    setQuery: (value: string) => setQuery(value),
    handleSearch,
    handleReset,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}
