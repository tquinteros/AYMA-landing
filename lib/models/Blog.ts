import { Schema, model, models } from "mongoose";

export type BlogStatus = "draft" | "scheduled" | "published";

export interface BlogImage {
  url: string;
  key?: string;
  alt?: string;
}

export interface BlogAuthor {
  name: string;
}

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: BlogImage;
  category?: string;
  tags: string[];
  author: BlogAuthor;
  status: BlogStatus;
  publishedAt?: Date;
  readingTimeMinutes: number;
  featured: boolean;
  seo: BlogSeo;
  views: number;
}

const BlogImageSchema = new Schema<BlogImage>(
  {
    url: { type: String, required: true },
    key: { type: String },
    alt: { type: String },
  },
  { _id: false }
);

const BlogAuthorSchema = new Schema<BlogAuthor>(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

const BlogSeoSchema = new Schema<BlogSeo>(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String },
  },
  { _id: false }
);

const BlogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: BlogImageSchema, required: true },
    category: { type: String },
    tags: { type: [String], default: [] },
    author: { type: BlogAuthorSchema, required: true },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published"],
      default: "draft",
    },
    publishedAt: { type: Date },
    readingTimeMinutes: { type: Number, default: 1 },
    featured: { type: Boolean, default: false },
    seo: { type: BlogSeoSchema, default: {} },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ category: 1 });

export const BlogModel = models.Blog || model<Blog>("Blog", BlogSchema);
