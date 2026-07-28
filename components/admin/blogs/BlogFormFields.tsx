"use client";

import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, RefreshCwIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { BlogEditor } from "@/components/admin/blog-editor/BlogEditor";
import { TagsInput } from "./TagsInput";
import { CoverImageUploader } from "./CoverImageUploader";
import { slugify } from "@/lib/utils/slugify";
import type { BlogFormValues } from "./blog-form-types";

const STATUS_OPTIONS: { value: BlogFormValues["status"]; label: string }[] = [
  { value: "draft", label: "Borrador" },
  { value: "scheduled", label: "Programado" },
  { value: "published", label: "Publicado" },
];

export function BlogFormFields({ idPrefix }: { idPrefix: string }) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BlogFormValues>();

  const title = watch("title");
  const status = watch("status");
  const publishedAt = watch("publishedAt");

  function regenerateSlug() {
    setValue("slug", slugify(title || ""), { shouldDirty: true });
  }

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList>
        <TabsTrigger value="content">Contenido</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-title`}>Título *</Label>
          <Input
            id={`${idPrefix}-title`}
            placeholder="Cómo empezar tu revolución del bienestar"
            aria-invalid={!!errors.title}
            {...register("title", { required: "El título es obligatorio." })}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-slug`}>
            Slug{" "}
            <span className="text-muted-foreground font-normal">
              (se genera automáticamente si lo dejás vacío)
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              id={`${idPrefix}-slug`}
              placeholder="como-empezar-tu-revolucion-del-bienestar"
              {...register("slug")}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={regenerateSlug}
              title="Regenerar slug a partir del título"
            >
              <RefreshCwIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-excerpt`}>Resumen *</Label>
          <Textarea
            id={`${idPrefix}-excerpt`}
            placeholder="Un resumen corto que aparece en las tarjetas del listado..."
            rows={2}
            aria-invalid={!!errors.excerpt}
            {...register("excerpt", { required: "El resumen es obligatorio." })}
          />
          {errors.excerpt && (
            <p className="text-xs text-destructive">{errors.excerpt.message}</p>
          )}
        </div>

        <CoverImageUploader />
        <input
          type="hidden"
          {...register("coverImageUrl", { required: "Subí una imagen de portada." })}
        />

        <div className="flex flex-col gap-1.5">
          <Label>Contenido *</Label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "El contenido es obligatorio." }}
            render={({ field }) => (
              <BlogEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <p className="text-xs text-destructive">{errors.content.message}</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="settings" className="flex flex-col gap-4 pt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-category`}>
              Categoría{" "}
              <span className="text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <Input
              id={`${idPrefix}-category`}
              placeholder="Nutrición"
              {...register("category")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-status`}>Estado</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id={`${idPrefix}-status`} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <TagsInput />

        {status === "scheduled" && (
          <div className="flex flex-col gap-1.5">
            <Label>Fecha de publicación *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  <CalendarIcon className="mr-1" />
                  {publishedAt ? format(new Date(publishedAt), "PPP") : "Elegir fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishedAt ? new Date(publishedAt) : undefined}
                  onSelect={(date) =>
                    setValue("publishedAt", date ? date.toISOString() : "", {
                      shouldDirty: true,
                    })
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${idPrefix}-featured`}>Destacado</Label>
            <p className="text-muted-foreground text-xs">
              Mostrar este blog en secciones destacadas.
            </p>
          </div>
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <Switch
                id={`${idPrefix}-featured`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </TabsContent>

      <TabsContent value="seo" className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-seo-title`}>
            Meta título{" "}
            <span className="text-muted-foreground font-normal">(opcional)</span>
          </Label>
          <Input
            id={`${idPrefix}-seo-title`}
            placeholder={title || "Se usa el título del blog si lo dejás vacío"}
            {...register("seoMetaTitle")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-seo-description`}>
            Meta descripción{" "}
            <span className="text-muted-foreground font-normal">(opcional)</span>
          </Label>
          <Textarea
            id={`${idPrefix}-seo-description`}
            rows={2}
            placeholder="Se usa el resumen del blog si lo dejás vacío"
            {...register("seoMetaDescription")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-seo-og-image`}>
            Imagen Open Graph{" "}
            <span className="text-muted-foreground font-normal">
              (URL, opcional — se usa la portada si la dejás vacía)
            </span>
          </Label>
          <Input
            id={`${idPrefix}-seo-og-image`}
            placeholder="https://..."
            {...register("seoOgImage")}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
