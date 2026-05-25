import { HOME_CONTENT, homeItems } from "@/lib/constants";

import { getHomeIcon } from "@/lib/utils";

import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="py-16">
        <section className="flex w-full flex-col items-center justify-center px-4">
          <h1 className="mb-6 w-full max-w-md text-center text-4xl font-semibold lg:max-w-3xl lg:text-6xl">
            {HOME_CONTENT.headline}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-sm text-center lg:max-w-lg">{HOME_CONTENT.subheadline}</p>
          <ul className="grid grid-cols-4 gap-1 lg:gap-2">
            {homeItems.map((homeItem) => {
              const { label, icon, itemClassName, iconClassName } = homeItem;

              const Icon = getHomeIcon(icon);

              return (
                <li key={label} className={itemClassName}>
                  <Icon className={iconClassName} />
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
