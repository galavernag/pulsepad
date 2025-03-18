"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoslide from "embla-carousel-auto-scroll";
import Link from "next/link";

export function UserCarousel({
  users,
}: {
  users: { name: string; img: string; link: string }[];
}) {
  return (
    <section className="relative mt-10 flex items-center justify-center mask max-w-3xl">
      <Carousel
        className="mt-10 -z-10"
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[
          Autoslide({
            speed: 1,
          }),
        ]}
      >
        <CarouselContent>
          {users.map((user, idx) => (
            <CarouselItem key={idx} className="text-center max-w-[300px]">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
                <img
                  src={user.img}
                  alt={user.name}
                  className="size-9 rounded-lg"
                />
                <div className="flex flex-col items-start">
                  <span className="font-syne">{user.name}</span>
                  <Link href={user.link}>
                    <span className="font-syne text-sm text-[#c5f74f] underline">
                      {user.link}
                    </span>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
