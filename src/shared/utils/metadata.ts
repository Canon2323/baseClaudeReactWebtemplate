import type { Metadata } from "next";

export const siteConfig = {
  name: "Next.js SOLID Boilerplate",
  description: "A modern Next.js boilerplate with SOLID architecture.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export function createMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} | ${siteConfig.name}`,
    description: description || siteConfig.description,
  };
}
