import ButtonActions from "@/features/device/components/button-actions";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

export default function DevicesPage() {
  return (
    <>
      <Header>
        <HeaderTitle>Devices</HeaderTitle>
      </Header>
      <main>
        <div className="flex justify-end">
          <ButtonActions />
        </div>
      </main>
    </>
  );
}
