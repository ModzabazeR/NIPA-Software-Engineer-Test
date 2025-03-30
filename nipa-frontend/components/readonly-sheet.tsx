import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ticket, TicketStatus } from "@/lib/types";
import UserInfo from "@/components/user-info";
import {
  CalendarDays,
  Edit,
  User,
  Phone,
  FileText,
  LucideIcon,
} from "lucide-react";
import { format } from "date-fns";
import StatusSelector from "./status-selector";

interface ReadonlySheetProps {
  ticket: Ticket;
  children: React.ReactNode;
  onStatusChange: (ticketId: string, newStatus: TicketStatus) => Promise<void>;
}

interface TicketInfoSectionProps {
  icon: LucideIcon;
  label: string;
  noBackground?: boolean;
  children: React.ReactNode;
}

function TicketInfoSection({
  icon: Icon,
  label,
  children,
  noBackground = false,
}: TicketInfoSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div
        className={`${
          noBackground ? "" : "bg-muted/80 p-3 rounded-md"
        } whitespace-pre-line`}
      >
        {children}
      </div>
    </div>
  );
}

export default function ReadonlySheet({
  ticket,
  children,
  onStatusChange,
}: ReadonlySheetProps) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-full md:w-[540px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-bold">{ticket.title}</SheetTitle>
          <SheetDescription className="text-base">
            View the complete ticket information
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 overflow-y-auto mb-8 mt-6">
          <TicketInfoSection icon={FileText} label="Status" noBackground>
            <StatusSelector
              status={ticket.status}
              onStatusChange={(newStatus) =>
                onStatusChange(ticket.id, newStatus)
              }
            />
          </TicketInfoSection>

          <TicketInfoSection icon={FileText} label="Ticket ID">
            <p className="text-sm">{ticket.id}</p>
          </TicketInfoSection>

          <TicketInfoSection icon={FileText} label="Description">
            <p className="text-sm break-words">{ticket.description}</p>
          </TicketInfoSection>

          <TicketInfoSection icon={Phone} label="Contact Information">
            <p className="text-sm">{ticket.contactInformation}</p>
          </TicketInfoSection>

          <TicketInfoSection icon={User} label="Created By">
            <UserInfo user={ticket.createdBy} />
          </TicketInfoSection>

          <TicketInfoSection icon={User} label="Last Updated By">
            {ticket.updatedBy ? (
              <UserInfo user={ticket.updatedBy} />
            ) : (
              <p className="text-sm text-muted-foreground cursor-default">
                Not updated yet
              </p>
            )}
          </TicketInfoSection>

          <TicketInfoSection icon={CalendarDays} label="Created At">
            <p className="text-sm">
              {format(new Date(ticket.createdAt), "PPP 'at' p")}
            </p>
          </TicketInfoSection>

          <TicketInfoSection icon={Edit} label="Last Updated">
            <p className="text-sm">
              {format(new Date(ticket.updatedAt), "PPP 'at' p")}
            </p>
          </TicketInfoSection>
        </div>
      </SheetContent>
    </Sheet>
  );
}
