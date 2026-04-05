type LayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <Shell>
      <Sidebar />
      <Content>{children}</Content>
    </Shell>
  );
}

function Sidebar() {
  return <aside className="hidden h-full flex-col border-r px-5 md:flex"></aside>;
}

function Shell({ children }: Pick<LayoutProps, "children">) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 border-x md:grid-cols-[224px_1fr]">
      {children}
    </div>
  );
}

function Content({ children }: Pick<LayoutProps, "children">) {
  return <div className="px-5">{children}</div>;
}
