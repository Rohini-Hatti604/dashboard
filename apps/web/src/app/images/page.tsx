import BrowseImagesContent from "@/components/sections/browse-images/browse-images-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Images - Clean Start Dashboard",
  description: "Browse and search container images, virtual machines, and packages",
};


export default function BrowseImagesPage() {
  return (
      <BrowseImagesContent />
  );
}
