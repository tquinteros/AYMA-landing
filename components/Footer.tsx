"use client";

import { useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import {
  subscribeToNewsletter,
  type NewsletterActionState,
} from "@/lib/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialNewsletterState: NewsletterActionState = {
  status: "idle",
  message: "",
};

const Footer = () => {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (pathname.startsWith("/admin")) return null;

  const isSubscribed = state.status === "success";

  return (
    <footer className="border-t border-primary-500 bg-roca-500">
      <div className="px-6 sm:px-8 lg:px-24">
        <section className="grid gap-8 border-b border-background-500/20 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)] lg:items-end lg:gap-16 lg:py-12">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] text-surface-900 uppercase">
              Newsletter AYMA
            </p>
            <h2 className="font-bodoni text-3xl leading-tight text-background-500 sm:text-4xl">
              Bienestar que llega a vos
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-surface-500 sm:text-base">
              Recibí novedades, experiencias y contenido para acompañar tu bienestar.
            </p>
          </div>

          <form ref={formRef} action={formAction} className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="Tu email"
                disabled={isPending || isSubscribed}
                aria-invalid={state.status === "error"}
                aria-describedby={state.message ? "newsletter-message" : undefined}
                className="h-12 flex-1 border-background-500/30 bg-background-500/10 px-4 text-base text-background-500 placeholder:text-surface-500 focus-visible:border-background-500/70 focus-visible:ring-background-500/20 disabled:bg-background-500/10 md:text-base"
              />
              <input
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <Button
                type="submit"
                size="lg"
                disabled={isPending || isSubscribed}
                className="h-12 bg-background-500 px-6 text-roca-500 hover:bg-background-900 sm:min-w-36"
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Enviando
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle2 />
                    ¡Listo!
                  </>
                ) : (
                  "Suscribirme"
                )}
              </Button>
            </div>

            <p
              id="newsletter-message"
              role={state.status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-3 min-h-5 text-sm ${
                state.status === "error" ? "text-red-300" : "text-surface-500"
              }`}
            >
              {state.message}
            </p>
          </form>
        </section>

        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <p className="text-center text-sm text-background-500 sm:text-base lg:text-left">
            © AYMA Wellness Club · Camino de los Remeros 1585, Tigre · Remeros Beach
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="mailto:info@aymawellnessclub.com"
              className="break-all text-center text-base text-background-500 underline transition-opacity duration-300 hover:opacity-75"
            >
              info@aymawellnessclub.com
            </a>
            <span className="hidden text-background-500 sm:block">|</span>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/5491124868493" target="_blank" rel="noreferrer">
                <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} />
              </a>
              <a
                href="https://www.instagram.com/aymawellness/"
                target="_blank"
                rel="noreferrer"
              >
                <Image src="/instagram.svg" alt="Instagram" width={28} height={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
