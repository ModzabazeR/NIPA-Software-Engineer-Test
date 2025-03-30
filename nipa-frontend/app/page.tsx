import TicketBoard from "@/components/ticket-board";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-dvh p-8">
      <TicketBoard />
    </div>
  );
}
