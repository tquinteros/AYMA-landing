"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, type BlogData } from "@/lib/actions/blog";
import { blogsQueryKey } from "@/lib/queries/blogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditBlogDialog } from "@/components/admin/blogs/EditBlogDialog";
import { DeleteBlogButton } from "@/components/admin/blogs/DeleteBlogButton";

interface BlogsTableProps {
  blogs: BlogData[];
}

const STATUS_LABEL: Record<BlogData["status"], string> = {
  draft: "Borrador",
  scheduled: "Programado",
  published: "Publicado",
};

const STATUS_VARIANT: Record<BlogData["status"], "secondary" | "outline" | "default"> = {
  draft: "outline",
  scheduled: "secondary",
  published: "default",
};

function formatDate(date?: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Un blog "scheduled" pasa a estar visible en el sitio público apenas su
 * publishedAt llega, aunque el campo status en la base siga en "scheduled"
 * hasta que se edite a mano. Acá reflejamos ese estado real en el admin.
 */
function getEffectiveStatus(blog: BlogData): BlogData["status"] {
  if (blog.status === "scheduled" && blog.publishedAt && new Date(blog.publishedAt) <= new Date()) {
    return "published";
  }
  return blog.status;
}

export function BlogsTable({ blogs }: BlogsTableProps) {
  const { data: queriedBlogs = blogs } = useQuery({
    queryKey: blogsQueryKey,
    queryFn: async (): Promise<BlogData[]> => getBlogs(),
    initialData: blogs,
  });

  if (queriedBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-muted-foreground text-sm">
          No hay blogs creados todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Portada</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="hidden sm:table-cell">Estado</TableHead>
            <TableHead className="hidden lg:table-cell">Categoría</TableHead>
            <TableHead className="hidden md:table-cell">Publicación</TableHead>
            <TableHead className="hidden md:table-cell">Destacado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queriedBlogs.map((blog) => {
            const effectiveStatus = getEffectiveStatus(blog);
            const autoPublished = effectiveStatus !== blog.status;

            return (
              <TableRow key={blog._id}>
                <TableCell>
                  <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={blog.coverImage.url}
                      alt={blog.coverImage.alt || blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </TableCell>
                <TableCell className="max-w-[220px] font-medium">
                  <span className="line-clamp-2">{blog.title}</span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex flex-col gap-1">
                    <Badge variant={STATUS_VARIANT[effectiveStatus]}>
                      {STATUS_LABEL[effectiveStatus]}
                    </Badge>
                    {autoPublished && (
                      <span className="text-[11px] leading-none text-muted-foreground">
                        Programado, ya en vivo
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {blog.category ? (
                    <Badge variant="secondary">{blog.category}</Badge>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                  {formatDate(blog.publishedAt)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {blog.featured ? (
                    <Badge variant="secondary">Sí</Badge>
                  ) : (
                    <span className="text-muted-foreground text-xs">No</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <EditBlogDialog blog={blog} />
                    <DeleteBlogButton id={blog._id} title={blog.title} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
