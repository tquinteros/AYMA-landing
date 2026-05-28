"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface ContactFormValues {
  name: string
  apellido: string
  email: string
  areaInteres?: string
  mensaje: string
}

const ContactForm = () => {
  const {
    register,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-roca-500 px-5 py-25 sm:px-8 lg:px-24">
      <div className="flex flex-col justify-between">
        <h3 className="max-w-2xl text-4xl font-normal leading-tight text-surface-500">
          PORQUE CUANDO EL{" "}
          <i>
            <b>BIENESTAR</b>
          </i>{" "}
          SE VUELVE HÁBITO, TODO CAMBIA, ESTO ES LA REVOLUCIÓN.
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
            className="border border-[#CBD5E1] bg-white! text-surface-900 py-5 text-[16px] placeholder:text-[16px] placeholder:text-surface-900"
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
            className="border border-[#CBD5E1] bg-white! py-5 text-[16px] text-surface-900 placeholder:text-[16px] placeholder:text-surface-500"
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
            className="border border-[#CBD5E1] bg-white! py-5 text-[16px] text-surface-900 placeholder:text-[16px] placeholder:text-surface-500"
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
          <Input
            id="area-interes"
            className="border border-[#CBD5E1] bg-white! py-5 text-[16px] text-surface-900 placeholder:text-[16px] placeholder:text-surface-500"
            placeholder="Área de interes (opcional)"
            {...register("areaInteres")}
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
            className="border border-[#CBD5E1] bg-white! py-5 text-[16px] text-surface-900 placeholder:text-[16px] placeholder:text-surface-500"
            placeholder="Tu mensaje"
            {...register("mensaje", { required: true })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full shrink-0 self-start bg-primary-500 px-7 py-6 text-base uppercase tracking-[5px] text-background-500 hover:bg-primary-500/90 sm:self-auto sm:py-7 lg:w-fit"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
