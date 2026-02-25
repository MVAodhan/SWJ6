import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { pb } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await pb
      .collection("users")
      .authWithPassword(emailRef.current!.value, passwordRef.current!.value);
    navigate({ to: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]  text-black">
      <div className=" bg-transparent w-full max-w-md shadow-xl border border-base-200 py-2 rounded-xl p-6">
        <div className=" bg-transparent min-h-72 ">
          <h2 className="card-title text-2xl font-bold justify-center my-6 ml-2">
            Welcome Back
          </h2>

          <div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-xl">
                {" "}
                Email address
              </Label>
              <input
                type="email"
                name="email"
                className="input w-full bg-transparent border border-black rounded-xl p-2"
                placeholder="email@example.com"
                ref={emailRef}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <Label htmlFor="password" className="text-xl">
                Password
              </Label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full bg-transparent border border-black focus-visible:ring-0 rounded-xl p-2"
                  placeholder="Enter your password"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 text-black flex items-center "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="card-actions mt-6 ">
              <button
                onClick={handleSubmit}
                className="border border-black p-2 rounded-xl w-full cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
