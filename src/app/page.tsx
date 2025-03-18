import Image from "next/image";
import { AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-7 py-5">
        <Image
          src="/logo-pulsepad.svg"
          alt="Pulsepad Logo"
          width={120}
          height={100}
        />

        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>

        <Button variant="ghost" size="icon" className="md:">
          <AlignRight />
        </Button>
      </header>

      <section className="flex flex-col font-syne items-center justify-center px-7 py-10">
        <h1 className="text-4xl font-bold text-center">
          Unleash the power of your stream!!
        </h1>

        <p className="text-lg text-center text-muted-foreground mt-4">
          Pulsepad is a streaming platform that allows you to power up your
        </p>
      </section>

      <section className="flex flex-col items-center justify-center px-7 py-10 bg-secondary">
        <h2 className="text-3xl font-bold text-center">What is Pulsepad?</h2>
        <p className="text-lg text-center text-muted-foreground mt-4 max-w-2xl">
          Pulsepad is a 100% online soundboard designed specifically for
          streamers. Play funny sounds and add excitement to your streams
          without installing any software - just open your browser and start
          entertaining your audience with perfectly timed sound effects.
        </p>
      </section>

      <section className="flex flex-col items-center justify-center px-7 py-10">
        <h2 className="text-3xl font-bold text-center">Simple Pricing</h2>
        <div className="grid gap-8 mt-8 md:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold">Free</h3>
            <p className="mt-2 text-3xl font-bold">$0</p>
            <p className="mt-4 text-muted-foreground">
              Perfect for casual streamers
            </p>
            <ul className="mt-4 space-y-2">
              <li>10 sound slots</li>
              <li>Basic sound effects library</li>
              <li>Standard quality audio</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg bg-primary text-primary-foreground">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="mt-2 text-3xl font-bold">$4.99/mo</p>
            <p className="mt-4 opacity-90">For dedicated streamers</p>
            <ul className="mt-4 space-y-2">
              <li>Unlimited sound slots</li>
              <li>Premium sound effects library</li>
              <li>High quality audio</li>
              <li>Custom sound uploads</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold">Team</h3>
            <p className="mt-2 text-3xl font-bold">$12.99/mo</p>
            <p className="mt-4 text-muted-foreground">For streaming teams</p>
            <ul className="mt-4 space-y-2">
              <li>Everything in Pro</li>
              <li>Share soundboards</li>
              <li>Team collaboration</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-7 py-10 bg-secondary">
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-6 max-w-3xl w-full">
          <div className="border-b pb-4">
            <h3 className="text-xl font-bold">
              Do I need to download anything?
            </h3>
            <p className="mt-2 text-muted-foreground">
              No! Pulsepad runs completely in your browser - no downloads or
              installations required.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-bold">
              What audio formats are supported?
            </h3>
            <p className="mt-2 text-muted-foreground">
              We support MP3, WAV, and OGG formats for custom sound uploads on
              paid plans.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-bold">
              Can I use Pulsepad with any streaming platform?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Yes! Pulsepad works with all major streaming platforms including
              Twitch, YouTube, and Facebook Gaming.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-bold">
              How do I play sounds during my stream?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Simply click on your saved sounds or use customizable keyboard
              shortcuts to trigger them instantly during your stream.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
