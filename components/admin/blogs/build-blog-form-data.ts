import type { BlogFormValues } from "./blog-form-types";

export function buildBlogFormData(
  values: BlogFormValues,
  extraFields?: Record<string, string>
): FormData {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("excerpt", values.excerpt);
  formData.append("content", values.content);
  formData.append("coverImageUrl", values.coverImageUrl);
  formData.append("coverImageKey", values.coverImageKey);
  formData.append("coverImageAlt", values.coverImageAlt);
  formData.append("category", values.category);
  formData.append("tags", values.tags.join("\n"));
  formData.append("status", values.status);
  formData.append("publishedAt", values.publishedAt);
  formData.append("featured", values.featured ? "true" : "false");
  formData.append("seoMetaTitle", values.seoMetaTitle);
  formData.append("seoMetaDescription", values.seoMetaDescription);
  formData.append("seoOgImage", values.seoOgImage);

  if (extraFields) {
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, value);
    }
  }

  return formData;
}
