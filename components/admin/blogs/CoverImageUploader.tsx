"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/upload";
import type { BlogFormValues } from "./blog-form-types";

export function CoverImageUploader() {
  const { watch, setValue, formState } = useFormContext<BlogFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const url = watch("coverImageUrl");
  const alt = watch("coverImageAlt");

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blogs/covers");
      const result = await uploadImage(undefined, formData);
      if (result.error || !result.url) {
        toast.error(result.error ?? "Error al subir la imagen.");
        return;
      }
      setValue("coverImageUrl", result.url, { shouldDirty: true, shouldValidate: true });
      setValue("coverImageKey", result.key ?? "", { shouldDirty: true });
    } catch {
      toast.error("Error al subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    setValue("coverImageUrl", "", { shouldDirty: true, shouldValidate: true });
    setValue("coverImageKey", "", { shouldDirty: true });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label>Imagen de portada *</Label>

      {url ? (
        <div className="relative overflow-hidden rounded-lg border border-input">
          <div className="relative aspect-video w-full bg-muted">
            <Image src={url} alt={alt || "Portada"} fill className="object-cover" unoptimized />
          </div>
          <div className="flex items-center justify-between gap-2 border-t bg-background p-2">
            <Input
              placeholder="Texto alternativo (SEO / accesibilidad)"
              value={alt}
              onChange={(e) =>
                setValue("coverImageAlt", e.target.value, { shouldDirty: true })
              }
              className="h-8 flex-1 border-none shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleRemove}
            >
              <X className="size-3.5" />
              <span className="sr-only">Quitar imagen</span>
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50 disabled:opacity-60"
        >
          {isUploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <ImagePlus className="size-6" />
          )}
          <span className="text-xs">
            {isUploading ? "Subiendo..." : "Hacé click para subir una imagen"}
          </span>
        </button>
      )}

      {formState.errors.coverImageUrl && (
        <p className="text-xs text-destructive">
          {formState.errors.coverImageUrl.message as string}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />
    </div>
  );
}
