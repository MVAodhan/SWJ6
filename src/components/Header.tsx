import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { pb } from "@/lib/utils";
import type { RecordModel } from "pocketbase";

export default function Header() {
  const [userAuth, setUserAuth] = useState<RecordModel | null>(null);
  useEffect(() => {
    setUserAuth(pb.authStore.record);

    const unsubscribe = pb.authStore.onChange((_, model) => {
      setUserAuth(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="p-4 flex items-center text-black">
        <div className="ml-4 text-md font-semibold flex gap-2 rounded-lg w-1/2">
          <Link to="/">Home </Link>
        </div>
        <div className="mr-4 text-md font-semibold flex justify-end gap-6 rounded-lg w-1/2 ">
          <NavigationMenu>
            <NavigationMenuItem asChild>
              {!userAuth && <Link to="/login">Login</Link>}
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              {userAuth && (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    pb.authStore.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </span>
              )}
            </NavigationMenuItem>
          </NavigationMenu>
          {userAuth && (
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
          )}
        </div>
      </header>
    </>
  );
}
