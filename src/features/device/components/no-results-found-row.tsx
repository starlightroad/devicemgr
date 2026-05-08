import { DatabaseIcon } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

export function NoResultsFoundRow({ columns, children }: { columns: number; children: React.ReactNode }) {
  return (
    <TableRow>
      <TableCell colSpan={columns}>
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">{children}</div>
      </TableCell>
    </TableRow>
  );
}

export function NoResultsFoundIcon() {
  return <DatabaseIcon className="text-muted-foreground size-5" />;
}

export function NoResultsFoundDescription({ children }: { children: string }) {
  return <span>{children}</span>;
}
