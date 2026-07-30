import { z } from "zod";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "El título es obligatorio.")
      .max(120, "El título no puede superar los 120 caracteres."),
    slug: z
      .string()
      .trim()
      .refine((value) => value === "" || SLUG_PATTERN.test(value), {
        message: "El slug solo puede tener minúsculas, números y guiones.",
      }),
    excerpt: z
      .string()
      .trim()
      .min(1, "El resumen es obligatorio.")
      .max(300, "El resumen no puede superar los 300 caracteres."),
    content: z.string().trim().min(1, "El contenido es obligatorio."),
    coverImageUrl: z.string().trim().min(1, "Subí una imagen de portada."),
    coverImageKey: z.string(),
    coverImageAlt: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    status: z.enum(["draft", "scheduled", "published"]),
    publishedAt: z.string(),
    featured: z.boolean(),
    seoMetaTitle: z
      .string()
      .max(70, "El meta título no debería superar los 70 caracteres."),
    seoMetaDescription: z
      .string()
      .max(160, "La meta descripción no debería superar los 160 caracteres."),
    seoOgImage: z.string(),
  })
  .refine((data) => data.status !== "scheduled" || data.publishedAt !== "", {
    message: "Elegí una fecha de publicación para el estado programado.",
    path: ["publishedAt"],
  });

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export const emptyBlogFormValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  coverImageKey: "",
  coverImageAlt: "",
  category: "",
  tags: [],
  status: "draft",
  publishedAt: "",
  featured: false,
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoOgImage: "",
};
