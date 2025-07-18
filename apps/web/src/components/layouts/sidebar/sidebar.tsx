import { IconBrain, IconScript, IconTableOptions } from '@tabler/icons-react';
import { Box, Element4, Receipt2, SearchNormal1 } from "iconsax-reactjs";
import Image from "next/image";
import SidebarItem from "./sidebar-item";
import UserDetailsCard from "./user-card";

function Sidebar() {
    const sidebarNavItems = [
        {
            label: "Dashboard",
            id: "dashboard",
            url: "/dashboard",
            icon: <Element4 />,
            isParent: false,
            external: false,
            disabled: true,
        },
        {
            label: "Tickets",
            id: "tickets",
            url: "/tickets",
            icon: <Receipt2 />,
            isParent: false,
            external: false,
            disabled: false,
        },
        {
            label: "Browse Images",
            id: "browse-images",
            url: "/images",
            icon: <SearchNormal1 />,
            isParent: false,
            external: false,
            disabled: false,
        },
        {
            label: "Build Images",
            id: "build-images",
            url: "/build-images",
            icon: <Box />,
            isParent: false,
            external: false,
            disabled: false,
        },
        {
            label: "Threat Intelligence",
            id: "threat-intelligence",
            url: "/threat-intelligence",
            icon: <IconBrain />,
            isParent: false,
            external: false,
            disabled: false,
        },
        {
            label: "Policy",
            id: "policy",
            url: "/policy",
            icon: <IconScript />,
            isParent: false,
            external: false,
            disabled: false,
        },
        {
            label: "Management",
            id: "management",
            url: "/management",
            icon: <IconTableOptions />,
            isParent: false,
            external: false,
            disabled: false,
        }
    ];
    return (
        <div className="relative h-full">
            <div className="px-2 h-full flex flex-col justify-between pb-2">
                <div>
                    <div className="py-6 flex items-center justify-center">
                        <div className="flex flex-row items-center gap-2 w-4/5">
                            <Image
                                alt="CleanStart"
                                src="/company/logos.png"
                                width={145}
                                height={0}
                                style={{ width: '100%', height: 'auto', maxWidth: '145px' }}
                            />
                            {/* <span className="text-xl font-bold">CleanStart</span> */}
                        </div>
                    </div>
                    <div className="space-y-1 justify-center">
                        {sidebarNavItems.map((item) => (
                            <SidebarItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>
                <UserDetailsCard />
            </div>
        </div>

    );
}

export default Sidebar;
