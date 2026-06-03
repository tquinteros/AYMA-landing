"use client"

import { ChevronDownIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const areaInteresOptions = [
  "Movimiento y entrenamiento",
  "Recuperación y contraste",
  "Terapias restaurativas",
  "Wellness integral",
  "Otra",
] as const

interface ContactFormValues {
  name: string
  apellido: string
  email: string
  areaInteres?: string
  mensaje: string
}

const inputFieldClassName =
  "h-14 rounded-lg border border-[#CBD5E1] bg-white! px-3 py-0 text-[16px] text-surface-900 placeholder:text-[16px] placeholder:text-surface-500 dark:bg-white!"

const areaInteresTriggerClassName =
  "flex h-14 w-full items-center justify-between rounded-lg border border-[#CBD5E1] bg-white! px-3 text-[16px] font-normal text-surface-900 outline-none transition-colors hover:bg-white! focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-white! dark:hover:bg-white!"

const textareaFieldClassName =
  "block h-28 min-h-28 max-h-28 resize-none rounded-lg border border-[#CBD5E1] bg-white! px-3 py-3 text-[16px] leading-6 text-surface-900 [field-sizing:fixed] placeholder:text-[16px] placeholder:text-surface-500 dark:bg-white!"

const ContactForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormValues>()

  const onSubmit = (data: ContactFormValues) => {
    console.log(data)
    toast.success("¡Gracias por contactarnos! Recibimos tu mensaje correctamente.")
    reset()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-roca-500 px-5 py-25 lg:pb-50 sm:px-8 lg:px-24">
      <div className="flex flex-col justify-between">
        <h3 className="max-w-2xl text-4xl font-normal leading-tight text-surface-500">
          PORQUE CUANDO EL{" "}
          <i>
            <b>BIENESTAR</b>
          </i>{" "}
          SE VUELVE HÁBITO, TODO CAMBIA, ESTO ES LA <span className="font-medium italic">REVOLUCIÓN</span>.
        </h3>
        <p className="max-w-xl mt-6 lg:mt-0 text-2xl font-normal text-surface-500">
          Conectá con nosotros por consultas o asesoramiento personalizado.
        </p>
      </div>

      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-[16px] font-normal text-surface-500"
          >
            Nombre
          </Label>
          <Input
            id="name"
            className={inputFieldClassName}
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="apellido"
            className="text-[16px] font-normal text-surface-500"
          >
            Apellido
          </Label>
          <Input
            id="apellido"
            className={inputFieldClassName}
            placeholder="Apellido"
            {...register("apellido", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[16px] font-normal text-surface-500"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className={inputFieldClassName}
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="area-interes"
            className="text-[16px] font-normal text-surface-500"
          >
            Área de interes (opcional)
          </Label>
          <Controller
            name="areaInteres"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger
                  id="area-interes"
                  type="button"
                  className={areaInteresTriggerClassName}
                >
                  <span
                    className={
                      field.value ? "text-surface-900" : "text-surface-500"
                    }
                  >
                    {field.value || "Área de interes (opcional)"}
                  </span>
                  <ChevronDownIcon className="size-4 shrink-0 text-surface-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width)">
                  <DropdownMenuRadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {areaInteresOptions.map((option) => (
                      <DropdownMenuRadioItem key={option} value={option}>
                        {option}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="mensaje"
            className="text-[16px] font-normal text-surface-500"
          >
            Tu mensaje
          </Label>
          <Textarea
            id="mensaje"
            className={textareaFieldClassName}
            placeholder="Tu mensaje"
            {...register("mensaje", { required: true })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit shrink-0 self-start bg-primary-500 px-7 py-6 text-base uppercase tracking-[5px] text-background-500 hover:bg-primary-500/90 sm:self-auto sm:py-7 lg:w-fit"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
