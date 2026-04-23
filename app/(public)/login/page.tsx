"use client";

import { useActionState, useEffect, useState } from "react";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [loadingStep, setLoadingStep] = useState<0 | 1>(0);

  useEffect(() => {
    if (!isPending) return;

    const timer = setTimeout(() => {
      setLoadingStep(1);
    }, 1400);

    return () => clearTimeout(timer);
  }, [isPending]);

  const loadingMessage =
    loadingStep === 0 ? "Verificando credenciales..." : "Validando acceso de administrador...";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,color-mix(in_oklab,var(--color-primary-500)_12%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 size-72 rounded-full bg-primary-500/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-1/4 size-56 rounded-full bg-roca-500/5 blur-3xl"
      />

      <Card className="relative w-full max-w-md border-primary-500/20 shadow-2xl shadow-roca-500/10 ring-1 ring-roca-500/10">
        <CardHeader className="space-y-1 pb-2 text-center sm:text-left">
          <CardTitle className="text-xl font-semibold tracking-tight text-roca-500 sm:text-2xl">
            <span className="font-bold text-surface-500">AYMA</span>
            <span className="font-normal text-muted-foreground">
              {" "}
              · administración
            </span>
          </CardTitle>
          <CardDescription className="text-surface-500 hidden" hidden={true}>
            Ingresá con tu cuenta para gestionar el sitio.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action={formAction}
            onSubmit={() => setLoadingStep(0)}
            className="flex flex-col gap-5"
          >
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nombre@ejemplo.com"
                className="h-10 bg-background/60"
                aria-invalid={Boolean(state?.error)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Contraseña</Label>
              <Input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-10 bg-background/60"
                aria-invalid={Boolean(state?.error)}
              />
            </div>

            {state?.error ? (
              <p
                role="alert"
                className="text-sm font-medium text-destructive"
              >
                {state.error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="h-11 w-full border-0 bg-primary-500 text-background-500 shadow-md hover:bg-primary-500/90 focus-visible:ring-primary-500/40"
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {loadingMessage}
                </span>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
