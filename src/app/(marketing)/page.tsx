import { ComputerIcon, DatabaseIcon, PrinterIcon, SmartphoneIcon } from "lucide-react";

import Navbar from "@/components/navbar";

export default function HomePage() {
  const headline = "Every Device. Every Location. Total Control.";
  const subheadline = "The smartest way to group, map, and manage your network assets without the clutter.";

  return (
    <>
      <Navbar />
      <main className="py-16">
        <section className="flex w-full flex-col items-center justify-center px-4">
          <h1 className="mb-6 w-full max-w-md text-center text-4xl font-semibold text-neutral-800 lg:max-w-3xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mb-6 max-w-sm text-center text-neutral-600 lg:max-w-lg">{subheadline}</p>
          <ul className="flex gap-4">
            <li className="rounded-3xl bg-red-300 p-6">
              <ComputerIcon size={24} className="text-red-900" />
            </li>
            <li className="rounded-3xl bg-indigo-300 p-6">
              <SmartphoneIcon size={24} className="text-indigo-900" />
            </li>
            <li className="rounded-3xl bg-green-300 p-6">
              <PrinterIcon size={24} className="text-green-900" />
            </li>
            <li className="rounded-3xl bg-amber-300 p-6">
              <DatabaseIcon size={24} className="text-amber-900" />
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
