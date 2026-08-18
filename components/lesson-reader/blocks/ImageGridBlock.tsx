"use client";
import * as React from "react";

interface ImageGridBlockProps {
  images?: { src: string; alt: string }[];
  caption?: string;
}

export function ImageGridBlock({ images, caption }: ImageGridBlockProps) {
  // Default illustrative nature images if none supplied
  const defaultImages = [
    { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", alt: "Frog in habitat" },
    { src: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80", alt: "Sunflowers" },
    { src: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80", alt: "Fungi mushroom" },
    { src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80", alt: "Bengal Tiger" },
    { src: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&q=80", alt: "Coral Reef" },
    { src: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80", alt: "Kingfisher Bird" },
  ];

  const hasCustomImages = Boolean(images && images.length > 0);
  const displayList = hasCustomImages ? (images as { src: string; alt: string }[]) : defaultImages;
  const displayCaption = caption || "Life exists in a variety of forms, places and interactions.";

  // Dynamic grid column class based on count
  const count = displayList.length;
  const gridColsClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : count === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className="my-6 space-y-2">
      <div className={`grid ${gridColsClass} gap-2 rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xs bg-gray-900/90 p-2`}>
        {displayList.map((img, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-xl bg-gray-950 group flex items-center justify-center ${
              count === 1 ? "max-h-[500px]" : "aspect-4/3"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300 rounded-lg"
            />
          </div>
        ))}
      </div>
      <p className="text-[11px] font-semibold text-gray-500 text-center italic">
        {displayCaption}
      </p>
    </div>
  );
}
