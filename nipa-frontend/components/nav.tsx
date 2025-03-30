import LogoutButton from "./logout-button";

export default function Nav() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Ticket Management System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
