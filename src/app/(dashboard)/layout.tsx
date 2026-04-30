import type { Metadata } from "next";

import { DASHBOARD_DESC, DASHBOARD_TITLE } from "@/features/dashboard/lib/constants";

import Sidebar from "@/features/dashboard/components/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: DASHBOARD_TITLE,
  description: DASHBOARD_DESC,
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <Shell>
      <Sidebar />
      <Content>{children}</Content>
    </Shell>
  );
}

function Shell({ children }: Pick<LayoutProps, "children">) {
  return <div className="grid min-h-screen grid-cols-1 md:grid-cols-[224px_1fr]">{children}</div>;
}

function Content({ children }: Pick<LayoutProps, "children">) {
  return <div className="mx-auto w-full max-w-7xl min-w-0 px-5">{children}</div>;
}
