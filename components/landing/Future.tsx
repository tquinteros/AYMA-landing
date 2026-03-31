import React from "react";
import Image from "next/image";

const Future = () => {
  const futureItems = [
    { src: "/future/movement.svg", label: "MOVIMIENTO" },
    { src: "/future/balance.svg", label: "EQUILIBRIO" },
    { src: "/future/awareness.svg", label: "CONSCIENCIA" },
    { src: "/future/integration.svg", label: "INTEGRACIÓN" },
  ];

  return (
    <section
      id="future"
      className="relative min-h-[560px] w-full bg-roca-500 sm:min-h-[620px] lg:min-h-[83vh]"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 sm:px-8 lg:px-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:grid-cols-4 md:gap-12 lg:gap-16">
          {futureItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-6 sm:gap-12"
            >
              <div className="flex h-[84px] w-full items-center justify-center sm:h-[100px] lg:h-[120px]">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={100}
                  height={100}
                  className="h-auto w-[70px] sm:w-[85px] lg:w-[100px]"
                />
              </div>
              <span className="text-center text-[13px] tracking-[2px] text-surface-500 sm:text-sm sm:tracking-[3px] lg:text-base lg:tracking-[5px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-1 px-5 pb-14 text-center sm:px-8 lg:items-end lg:px-24 lg:pb-20 lg:text-right">
        <p className="text-surface-500 text-xl sm:text-3xl lg:text-[39px]">
          PORQUE EL FUTURO SE CONSTRUYE,
        </p>
        <p className="text-surface-500 text-xl sm:text-3xl lg:mt-2 lg:text-[39px]">
          SE ENTRENA, SE PRACTICA Y SE
          <span className="font-medium italic"> HABITA.</span>
        </p>
      </div>
    </section>
  );
};

export default Future;
