import Nav from "@/components/nav";
import TicketBoard from "@/components/tickets/ticket-board";

export default function Home() {
  return (
    <div className="mx-auto md:mx-8 my-6">
      <Nav />
      <div className="flex flex-col gap-8 min-h-dvh p-8">
        <TicketBoard />
      </div>
    </div>
  );
}
