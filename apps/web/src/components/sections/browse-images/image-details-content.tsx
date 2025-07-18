'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import DetailsTabContent from '@/components/sections/browse-images/details-tab-content';
import AdvisoryTabContent from './advisory-tab-content';
import ProvenanceTabContent from './provenance-tab-content';
import SpecificationTabContent from './specification-tab-content';
import SbomTabContent from './sbom-tab-content';
import VulnerabilitiesTabContent from './vulnerabilities-tab-content';
import { LayoutContext } from '@/components/providers/layout-provider';

import {
  IconAlertTriangle,
  IconFileDescription,
  IconFiles,
  IconHistoryToggle,
  IconShieldExclamation,
  IconTableOptions,
  IconTag,
} from '@tabler/icons-react';

import { ImageDetails } from '@/types/browse-images';
import {
  AdvisoryTableRow,
  ProvenanceData,
  SBOMTableRow,
  SpecificationsData,
  TagTableRow,
  VulnerabilitiesData,
} from './mockdata';

interface Props {
  imageId: string;
  imageData: ImageDetails & {
    provenance?: ProvenanceData;
    specifications?: SpecificationsData;
    vulnerabilitiesData?: VulnerabilitiesData[];
    advisoriesData?: AdvisoryTableRow[];
    tagsData?: TagTableRow[];
    sbom?: SBOMTableRow[];
  };
}



export default function ImageDetailsContent({ imageId, imageData }: Props) {
  const [activeTab, setActiveTab] = useState('details');
  const { setPlaceholder } = useContext(LayoutContext)!;
  const router = useRouter();

  useEffect(() => {
    setPlaceholder('Search...');
  }, [setPlaceholder]);

  return (
    <div className="px-6 pt-2 flex flex-col h-full">
      

      

      {/* Tabs */}
     {/*} <div className="border-b border-[#363636] mb-4">
        <div className="flex gap-6">
          {tabConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            if (tab.isLink) {
              return (
                <Link
                  key={tab.key}
                  href={`/browse-images/${imageId}/${tab.key}`}
                  className={`py-2 px-1 text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActive ? 'text-[#039BE6] border-b-2 border-[#039BE6]' : 'text-[#FAFAFA]'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </Link>
              );
            }

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive ? 'text-[#039BE6] border-b-2 border-[#039BE6]' : 'text-[#FAFAFA]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>*/}

      {/* Tab Content */}
      <div className="flex-grow flex flex-col">
        {activeTab === 'details' && <DetailsTabContent image={imageData} />}
        {activeTab === 'provenance' &&
          (imageData.provenance ? (
            <ProvenanceTabContent provenance={imageData.provenance} />
          ) : (
            <div className="text-[#6E6E6E] text-center py-12 text-lg">No provenance data</div>
          ))}
        {activeTab === 'specifications' &&
          (imageData.specifications ? (
            <SpecificationTabContent specifications={imageData.specifications} />
          ) : (
            <div className="text-[#6E6E6E] text-center py-12 text-lg">No specifications data</div>
          ))}
        {activeTab === 'vulnerabilities' &&
          (imageData.vulnerabilitiesData ? (
            <VulnerabilitiesTabContent vulnerabilitiesData={imageData.vulnerabilitiesData} />
          ) : (
            <div className="text-[#6E6E6E] text-center py-12 text-lg">No vulnerabilities data</div>
          ))}
        {activeTab === 'advisories' &&
          (imageData.advisoriesData ? (
            <AdvisoryTabContent advisoryData={imageData.advisoriesData} />
          ) : (
            <div className="text-[#6E6E6E] text-center py-12 text-lg">No advisories data</div>
          ))}
        {activeTab === 'sbom' &&
          (imageData.sbom ? (
            <SbomTabContent image={imageData.sbom} />
          ) : (
            <div className="text-[#6E6E6E] text-center py-12 text-lg">No SBOM data</div>
          ))}
      </div>
    </div>
  );
}
