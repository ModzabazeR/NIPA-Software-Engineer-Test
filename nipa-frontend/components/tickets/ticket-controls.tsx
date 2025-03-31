import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketStatus } from "@/lib/types";
import { ArrowUpDown, Filter } from "lucide-react";

interface TicketControlsProps {
  onSortChange: (sortBy: "updatedAt" | "createdAt") => void;
  onFilterChange: (status: TicketStatus | "all") => void;
  currentSort: "updatedAt" | "createdAt";
  currentFilter: TicketStatus | "all";
}

export function TicketControls({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilter,
}: TicketControlsProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort By:{" "}
            <span className="capitalize">
              {currentSort === "updatedAt" ? "Latest Update" : "Creation Date"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onSortChange("updatedAt")}>
            Latest Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("createdAt")}>
            Creation Date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter:{" "}
            <span className="capitalize">
              {currentFilter === "all" ? "All" : currentFilter}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onFilterChange("all")}>
            All Tickets
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("pending")}>
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("accepted")}>
            Accepted
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("resolved")}>
            Resolved
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("rejected")}>
            Rejected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
