import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function Carousel({ carousel }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

/*   useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]); */

  return (
    <div className="embla w-full h-full" ref={emblaRef}>
      <div className="embla__container flex">
        {carousel.map((item, index) => (
          <div
            key={index}
            className="embla__slide flex items-center justify-center"
          >
            <Image
              src={`https:${item.fields.image.fields.file.url}`}
              alt={item.fields.imageTitle}
              className="w-full h-[350px] object-cover"
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
