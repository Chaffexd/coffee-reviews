import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function Carousel({ carousel }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla w-full h-full border-2 border-divider" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {carousel?.map((item, index) => (
          <div
            key={index}
            className="embla__slide relative min-h-[440px]"
          >
            <Image
              src={`https:${item.fields.image.fields.file.url}`}
              alt={item.fields.imageTitle}
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
