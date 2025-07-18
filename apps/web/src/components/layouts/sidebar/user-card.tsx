"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconLogout } from "@tabler/icons-react";
import { CircleUser } from "lucide-react";
import { Separator } from "../../ui/separator";

function UserDetailsCard() {
    function handleLogout() {
        console.log("Logout");
    }
    return (
        <div className="w-full">
            <Separator className="bg-[#363636] mb-2" />
            <div className="flex items-center justify-between w-full overflow-hidden">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                            <CircleUser />
                        </AvatarFallback>
                    </Avatar>
                    <div className=" text-base">
                        Admin
                    </div>
                </div>

                <div
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-accent rounded-md p-1.5"
                >
                    <IconLogout size={18} />
                </div>
            </div>
        </div>
    )
}

export default UserDetailsCard