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
      className="w-full bg-roca-500"
    >
      <div className="px-5 pt-16 sm:px-8 sm:pt-24 lg:px-24 lg:pt-[268px]">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-9 md:grid-cols-4 md:gap-10 lg:gap-12">
          {futureItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-4 sm:gap-8"
            >
              <div className="flex h-[72px] w-full items-center justify-center sm:h-[86px] lg:h-[96px]">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={100}
                  height={100}
                  className="h-auto w-[58px] sm:w-[70px] lg:w-[82px]"
                />
              </div>
              <span className="text-center text-[13px] tracking-[2px] text-surface-500 sm:text-sm sm:tracking-[3px] lg:text-base lg:tracking-[5px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none z-10 mt-12 flex flex-col items-center gap-1 px-5 pb-16 text-center sm:mt-16 sm:px-8 sm:pb-20 lg:mt-[114px] lg:items-end lg:px-24 lg:pb-[100px] lg:text-right">
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
