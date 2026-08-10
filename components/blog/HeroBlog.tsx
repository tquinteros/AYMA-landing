import Image from "next/image";

const HeroBlog = () => {
  return (
    <section id="hero-blog" className="relative h-[75svh] overflow-hidden">
      <Image
        src="/heroblogs.png"
        alt="Journal background"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="text-5xl text-surface-500 lg:text-[64px]">JOURNAL</h1>
      </div>
    </section>
  );
};

export default HeroBlog;
