import { Button, Card } from "@heroui/react";

import { PanelRightIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <header className="flex items-center justify-between py-5">
        <h1 className="font-semibold">Dashboard</h1>
        <Button type="button" variant="ghost" size="sm" isIconOnly className="md:hidden">
          <PanelRightIcon />
        </Button>
      </header>
      <main className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <article>
            <Card>
              <Card.Header>
                <Card.Title>Total Devices</Card.Title>
                <Card.Description>You have no devices saved.</Card.Description>
              </Card.Header>
            </Card>
          </article>
          <article>
            <Card>
              <Card.Header>
                <Card.Title>Health Status</Card.Title>
                <Card.Description>Everything looks good.</Card.Description>
              </Card.Header>
            </Card>
          </article>
        </div>
        <article>
          <Card>
            <Card.Header>
              <Card.Title>Recent Devices</Card.Title>
              <Card.Description>You have no devices saved.</Card.Description>
            </Card.Header>
          </Card>
        </article>
        <article>
          <Card>
            <Card.Header>
              <Card.Title>Map</Card.Title>
              <Card.Description>A map of your devices.</Card.Description>
            </Card.Header>
          </Card>
        </article>
      </main>
    </>
  );
}
