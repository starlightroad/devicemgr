import { Card } from "@heroui/react";

export default function TotalDevices() {
  const DEVICES_COUNT = 10;

  return (
    <Card className="h-auto min-h-60">
      <Card.Header>
        <Card.Title>Total Devices</Card.Title>
      </Card.Header>
      <Card.Content className="items-center justify-center">
        <p className="text-muted mb-10 text-6xl font-semibold">{DEVICES_COUNT}</p>
      </Card.Content>
    </Card>
  );
}
