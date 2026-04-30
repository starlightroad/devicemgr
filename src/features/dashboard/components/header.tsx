import MobileNav from "@/features/dashboard/components/mobile-nav";

type HeaderProps = { children: React.ReactNode };

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-5">
      {children}
      <MobileNav />
    </header>
  );
}

type HeaderTitleProps = { children: string };

export function HeaderTitle({ children }: HeaderTitleProps) {
  if (typeof children !== "string") {
    throw new Error("Title must be of type string.");
  }

  return <h1 className="font-semibold">{children}</h1>;
}
