"use client";

import { TicketStatus } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { statusColors } from "@/lib/statusColors";
interface StatusSelectorProps {
  status: TicketStatus;
  onStatusChange: (status: TicketStatus) => void;
}

export default function StatusSelector({
  status,
  onStatusChange,
}: StatusSelectorProps) {
  const statuses: TicketStatus[] = [
    "pending",
    "accepted",
    "resolved",
    "rejected",
  ];
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(status);

  return (
    <Select
      value={selectedStatus}
      onValueChange={(value: TicketStatus) => {
        setSelectedStatus(value);
        onStatusChange(value);
      }}
    >
      <SelectTrigger
        className={`w-full ${statusColors[selectedStatus].background} ${statusColors[selectedStatus].foreground} capitalize font-medium`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className={`${statusColors[status].background} ${statusColors[status].foreground} focus:${statusColors[status].background} focus:${statusColors[status].foreground} capitalize font-medium my-1`}
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
