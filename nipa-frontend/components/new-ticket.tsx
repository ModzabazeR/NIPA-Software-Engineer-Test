"use client";

import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useTicketForm } from "@/hooks/useTicketForm";
import { TicketForm } from "@/components/forms/ticket-form";

interface NewTicketProps {
  onSuccess: () => void;
}

export default function NewTicket({ onSuccess }: NewTicketProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { form, onSubmit } = useTicketForm(() => {
    setIsSheetOpen(false);
    onSuccess();
  });

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <div className="flex items-center gap-2 w-max rounded-sm cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-3 py-2">
          <Plus className="h-4 w-4" />
          Create New Ticket
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new ticket</SheetTitle>
          <SheetDescription>
            Please fill in the form below to create a new ticket.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <TicketForm form={form} onSubmit={onSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
