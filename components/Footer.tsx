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
      <div className="px-6 py-10 sm:px-8 lg:px-24 lg:py-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 lg:gap-y-12">
          <div className="min-w-0">
            <p className="mb-3 text-[14px] tracking-[0.43em] text-surface-900 uppercase">
              AYMA JOURNALS
            </p>
            <h2 className="text-[24px] leading-snug text-background-500">
              Recibí novedades, experiencias y contenido para acompañar tu bienestar.
            </h2>
          </div>

          <div className="flex min-w-0 items-center justify-start lg:justify-end lg:self-center">
            <Image
              src="/footer-logo.svg"
              alt="AYMA"
              width={126}
              height={36}
              className="h-8 w-auto sm:h-14"
            />
          </div>

          <form
            ref={formRef}
            action={formAction}
            className="w-full min-w-0 self-end"
          >
            <label
              htmlFor="newsletter-email"
              className="mb-2 block text-[16px] text-surface-500"
            >
              Tu email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="ejemplo@email.com"
                disabled={isPending || isSubscribed}
                aria-invalid={state.status === "error"}
                aria-describedby={state.message ? "newsletter-message" : undefined}
                className="h-12 flex-1 rounded-lg border-0 bg-background-500 px-4 text-base text-roca-500 placeholder:text-surface-500 focus-visible:ring-primary-500/30 disabled:opacity-70 md:text-base"
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
                className="h-12 rounded-lg cursor-pointer bg-primary-500 px-6 text-sm tracking-[0.25em] text-background-500 uppercase hover:bg-primary-500/90 sm:min-w-40"
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

            {state.message ? (
              <p
                id="newsletter-message"
                role={state.status === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mt-3 text-sm ${
                  state.status === "error" ? "text-red-300" : "text-surface-500"
                }`}
              >
                {state.message}
              </p>
            ) : null}
          </form>

          <div className="flex flex-col items-start gap-4 self-end lg:items-end">
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/aymawellness/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-75"
              >
                <Image src="/instagram.svg" alt="Instagram" width={36} height={36} />
              </a>
              <a
                href="https://wa.me/5491124868493"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-75"
              >
                <Image src="/whatsapp.svg" alt="WhatsApp" width={36} height={36} />
              </a>
            </div>

            <a
              href="mailto:info@aymawellnessclub.com"
              className="text-base text-background-500 underline transition-opacity duration-300 hover:opacity-75"
            >
              info@aymawellnessclub.com
            </a>

            <p className="text-sm text-background-500 lg:text-right">
              © AYMA Wellness Club | Camino de los Remeros 1585, Tigre | Remeros Beach
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
