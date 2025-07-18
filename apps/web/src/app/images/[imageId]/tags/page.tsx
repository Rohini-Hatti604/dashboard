import TagsTabContent from "@/components/sections/browse-images/tags-tab-content";

import { IMAGE_DATA } from "@/components/sections/browse-images/mockdata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    imageId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { imageId } = await params;
  const image = IMAGE_DATA[imageId] || IMAGE_DATA.prometheus;

  return {
    title: `${image.name} - Browse Images - Clean Start Dashboard`,
    description: image.overview,
  };
}

export default async function ImageDetailsPage({ params }: Props) {
  const { imageId } = await params;
  const image = IMAGE_DATA[imageId] || IMAGE_DATA.prometheus;

  if (!image && imageId !== "prometheus") {
    notFound();
  }

  console.log("imageId:", image.name); // or image.id if exists
console.log("tagsData:", image.tagsData);


  return (
 
     
      <TagsTabContent image={image} />
   
  );
}