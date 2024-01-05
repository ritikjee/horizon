import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="text-center w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-semibold text-indigo-500">404</h1>
      <p className="mb-4 text-lg text-gray-600 dark:text-white">
        Oops! Looks like you are lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-indigo-500 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600 dark:text-white ">
        Let `&apos` get you back
        <Link href="/" className="pl-5">
          <Button variant={"primary"}>
            <Home size={16} /> Home
          </Button>
        </Link>
        .
      </p>
    </div>
  );
}
