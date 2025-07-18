import ImageDetailsCard from '@/components/sections/browse-images/image-details-card';
import ImageTabsNav     from '@/components/sections/browse-images/image-tabs-nav';
import { IMAGE_DATA }   from '@/components/sections/browse-images/mockdata';
import { notFound }     from 'next/navigation';
import { ReactNode }    from 'react';

interface Props {
  children: ReactNode;
  params: Promise<{ imageId: string }>;   
}

export default  async function ImageLayout({ children, params }: Props) {
  const { imageId } = await params;                         
  const image = IMAGE_DATA[imageId] ?? IMAGE_DATA.prometheus;

  if (!image) notFound();                             

  return (
    <div className="flex flex-col h-full p-6">
      <ImageDetailsCard image={image} />

      <div className="mt-6">
        <ImageTabsNav imageId={imageId} />
      </div>

      <div className="flex-grow mt-6">{children}</div>
    </div>
  );
}
