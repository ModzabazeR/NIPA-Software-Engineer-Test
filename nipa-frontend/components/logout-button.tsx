"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api/authApi";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      onClick={logout}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
}
