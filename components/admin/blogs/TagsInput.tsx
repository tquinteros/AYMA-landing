"use client";

import { useState, KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { BlogFormValues } from "./blog-form-types";

export function TagsInput() {
  const { control } = useFormContext<BlogFormValues>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => {
        const tags: string[] = Array.isArray(field.value) ? field.value : [];

        function addTag(raw: string) {
          const tag = raw.trim();
          if (tag && !tags.includes(tag)) {
            field.onChange([...tags, tag]);
          }
          setInputValue("");
        }

        function removeTag(index: number) {
          field.onChange(tags.filter((_, i) => i !== index));
        }

        function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
          }
          if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            removeTag(tags.length - 1);
          }
        }

        return (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="blog-tags">
              Tags{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (opcional, Enter o coma para agregar)
              </span>
            </Label>

            <div
              className="flex min-h-11 w-full cursor-text flex-wrap items-start content-start gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              onClick={() => document.getElementById("blog-tags")?.focus()}
            >
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="flex h-6 items-center gap-1 text-xs font-normal"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                    aria-label={`Eliminar ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              <input
                id="blog-tags"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (inputValue.trim()) addTag(inputValue);
                  field.onBlur();
                }}
                placeholder={tags.length === 0 ? "bienestar, longevidad..." : ""}
                className="min-w-[140px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        );
      }}
    />
  );
}
