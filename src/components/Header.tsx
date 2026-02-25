import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <>
      <header className="p-4 flex items-center text-black">
        <div className="ml-4 text-xl font-semibold flex gap-2 rounded-lg w-1/2">
          <Link to="/">Home</Link>
        </div>
        <div className="mr-4 text-xl font-semibold flex justify-end gap-2 rounded-lg w-1/2 ">
          <Link to="/login">Login</Link>
        </div>
      </header>
    </>
  );
}
