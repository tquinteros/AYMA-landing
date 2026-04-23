"use client";

import { useState, KeyboardEvent } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FormValues {
    name: string;
    price: string;
    description: string;
    features: string[];
    tag: string;
    bottomText: string;
}

interface FeatureInputProps {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
}

export function FeatureTagInput({ control, errors }: FeatureInputProps) {
    const [inputValue, setInputValue] = useState("");

    return (
        <Controller
            name="features"
            control={control}
            rules={{
                validate: (v) =>
                    (Array.isArray(v) && v.length > 0) ||
                    "Agregá al menos un beneficio.",
            }}
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
                        <Label htmlFor="create-features">
                            Beneficios *{" "}
                            <span className="text-muted-foreground font-normal text-xs">
                                (Enter o coma para agregar)
                            </span>
                        </Label>

                        <div
                            className={`
                flex flex-wrap items-start content-start gap-1.5 min-h-11 w-full rounded-md border
                bg-background px-3 py-2 text-sm cursor-text
                focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
                ${errors.features ? "border-destructive" : "border-input"}
              `}
                            onClick={() =>
                                document.getElementById("create-features")?.focus()
                            }
                        >
                            {tags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="flex items-center gap-1 h-6 text-xs font-normal"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(i)}
                                        className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                                        aria-label={`Eliminar ${tag}`}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}

                            <input
                                id="create-features"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={() => {
                                    if (inputValue.trim()) addTag(inputValue);
                                    field.onBlur();
                                }}
                                placeholder={tags.length === 0 ? "Acceso ilimitado..." : ""}
                                className="flex-1 min-w-[140px] outline-none bg-transparent placeholder:text-muted-foreground"
                            />
                        </div>

                        {errors.features && (
                            <p className="text-xs text-destructive">
                                {errors.features.message as string}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
}