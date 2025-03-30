import { CalendarIcon, IdCardIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "@/lib/types";
import { format } from "date-fns";

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-left text-sm font-medium cursor-pointer hover:underline">
          @{user.username}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{user.username}</h4>
            <p className="text-sm">{user.email}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <IdCardIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">{user.id}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
