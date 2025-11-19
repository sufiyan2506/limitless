"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Powered By",
  logos = [],
  className,
}: Logos3Props) => {
  return (
    <section className={className}>
      <div className="py-10 md:py-14">
        {/* Heading */}
        {heading && (
          <h2 className="mb-8 text-center text-lg md:text-xl font-semibold text-white/70 tracking-wide">
            {heading}
          </h2>
        )}

        {/* Carousel */}
        <div className="relative mx-auto flex items-center justify-center max-w-6xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="
                    flex justify-center pl-0
                    basis-1/2 
                    xs:basis-1/3 
                    sm:basis-1/4 
                    md:basis-1/5 
                    lg:basis-1/6
                  "
                >
                  <div className="mx-3 sm:mx-4 md:mx-5 flex shrink-0 items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      loading="lazy"
                      decoding="async"
                      className={`h-8 w-auto select-none pointer-events-none ${logo.className || ""}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Left Fade */}
          <div className="absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
