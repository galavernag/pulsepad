import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { UserCarousel } from "@/shared/components/user-carousel";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { DoorOpen, LayoutDashboard } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <main className="">
        <header className="flex items-center justify-between w-full max-w-5xl mx-auto py-5 px-10 border mt-5 rounded-full">
          <Image
            src="/logo-pulsepad.svg"
            alt="Pulsepad Logo"
            width={120}
            height={100}
          />

          <nav className="font-syne">
            <Link href="#pricing">Pricing</Link>
          </nav>

          <div>
            <SignedOut>
              <SignInButton forceRedirectUrl="/app/soundboard">
                <Button className="cursor-pointer font-syne font-medium transition-colors">
                  <DoorOpen />
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/app/soundboard">
                <Button className="cursor-pointer bg-[#c5f74f] font-syne font-medium hover:bg-[#c5f74f]/90 transition-colors">
                  <LayoutDashboard />
                  Open Soundboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </header>

        <section className="mt-26 flex flex-col items-center">
          <h2 className="text-5xl max-w-2xl font-syne font-semibold text-center">
            Unleash the power of your livestream with{" "}
            <span className="text-[#c5f74f] underline">100% online</span>{" "}
            soundboard.
          </h2>
          <p className="text-lg mt-5 max-w-2xl text-center text-white/50 italic">
            Forget the hassles of setting up a bunch of softwares. Just open and
            start playing 🔥
          </p>

          <SignedOut>
            <div className="flex items-center gap-10">
              <SignInButton forceRedirectUrl="/app/soundboard">
                <Button className="scale-110 cursor-pointer mt-10 font-syne font-medium transition-colors">
                  Login
                </Button>
              </SignInButton>

              <SignInButton forceRedirectUrl="/app/soundboard">
                <Button className="scale-110 cursor-pointer mt-10 bg-[#c5f74f] font-syne font-medium hover:bg-[#c5f74f]/90 transition-colors">
                  Start now 🚀
                </Button>
              </SignInButton>
            </div>
          </SignedOut>

          <div className="rounded-lg border mt-10">
            <Image
              src="/demo-pulsepad.png"
              className="rounded-lg"
              alt="A screenshot of Pulsepad"
              width={1100}
              height={1100}
            />
          </div>
        </section>
        <UserCarousel
          users={[
            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },

            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },

            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },

            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },

            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },

            {
              name: "Guilherme Galaverna",
              img: "https://github.com/galavernag.png",
              link: "https://github.com/galavernag",
            },
          ]}
        />

        <section
          id="pricing"
          className="flex flex-col items-center mt-10 gap-10"
        >
          <div className="text-center space-y-3">
            <h2 className="font-syne text-3xl font-bold">Pricing 💰</h2>
            <p>Choose the plan that fits your needs.</p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <Card className="scale-110">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$0</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <li>Free forever</li>
                <li>10 sounds</li>
                <li>1 soundboard</li>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe</Button>
              </CardFooter>
            </Card>

            <Card className="scale-110">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$0</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <li>Free forever</li>
                <li>10 sounds</li>
                <li>1 soundboard</li>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      {/* <footer className="bg-zinc-100 mt-10 w-full h-[600px] before:w-full before:block before:h-[70px] before:rounded-b-full before:bg-background text-black">
        <main className="grid grid-cols-2 px-40 py-24">
          <div className="space-y-4">
            <img src="/logo-pulsepad-dark.svg" alt="" className="scale-125" />

            <ul className="font-syne">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="#pricing">Pricing</Link>
              </li>
            </ul>
          </div>
        </main>
      </footer> */}
    </main>
  );
}
