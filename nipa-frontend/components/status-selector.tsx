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
        className={`w-full bg-${selectedStatus}-background text-${selectedStatus}-foreground capitalize font-medium`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className={`bg-${status}-background text-${status}-foreground focus:bg-${status}-background focus:text-${status}-foreground capitalize font-medium my-1`}
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
