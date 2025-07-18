'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconAlertTriangle,
  IconFileDescription,
  IconFiles,
  IconHistoryToggle,
  IconShieldExclamation,
  IconTableOptions,
  IconTag,
} from '@tabler/icons-react';

interface Props {
  imageId: string;
}

const tabs = [
  { name: 'Details', path: 'details', icon: IconFileDescription },
  { name: 'Tags', path: 'tags', icon: IconTag },
  { name: 'Provenance', path: 'provenance', icon: IconHistoryToggle },
  { name: 'Specifications', path: 'specifications', icon: IconTableOptions },
  { name: 'SBOM', path: 'sbom', icon: IconFiles },
  { name: 'Vulnerabilities', path: 'vulnerabilities', icon: IconAlertTriangle },
  { name: 'Advisories', path: 'advisories', icon: IconShieldExclamation },
];

export default function ImageTabsNav({ imageId }: Props) {
  const pathname = usePathname();
  const currentTab = pathname.split('/')[3];

  return (
    <div className="border-b border-gray-700">
      <nav className="flex gap-6 text-sm font-medium">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const href = `/images/${imageId}/${tab.path}`;
          const isActive = currentTab === tab.path;

          return (
            <Link
              key={tab.name}
              href={href}
              className={`relative pb-2 flex items-center gap-2
                after:absolute after:left-0 after:-bottom-[2px]
                after:h-[2px] after:w-full after:origin-left
                after:transition-transform after:duration-200
                ${
                  isActive
                    ? 'text-[#039BE6] after:scale-x-100 after:bg-[#039BE6]'
                    : 'text-[#FAFAFA] hover:text-[#039BE6] after:scale-x-0 hover:after:scale-x-100 hover:after:bg-[#039BE6]'
                }`}
            >
              <Icon size={16} />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
