import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { components } from "react-select";
import Highlighter from "react-highlight-words";
import { getUserAvatarColor, mockUsers } from "../../sections/sidebar-sheet/utils/mock-data";

// Custom react-select components
export const CustomOption = (props: any) => {
    const { data, selectProps } = props;
    const inputValue = selectProps.inputValue;
    const user = mockUsers.find(u => u.email === data.value);

    if (!user) return <components.Option {...props} />;

    return (
        <components.Option {...props} style={{ backgroundColor: 'transparent' }}>
            <div
                className="flex items-center justify-between px-2 py-0.5 rounded-md cursor-pointer transition-colors dark:hover:bg-[#323232]"
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        getUserAvatarColor(user.id)
                    )}>
                        <span className="font-medium text-sm">
                            {user.name[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                            <Highlighter
                                searchWords={[inputValue]}
                                autoEscape
                                textToHighlight={user.name}
                                highlightClassName="bg-[#FF8C65] font-semibold"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    <Highlighter
                        searchWords={[inputValue]}
                        autoEscape
                        textToHighlight={user.email}
                        highlightClassName="bg-[#FF8C65] font-semibold"
                    />
                </div>
            </div>
        </components.Option>
    );
};

export const CustomControl = (props: any) => {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    return (
        <components.Control {...props}>
            <div className="flex items-center pl-3">
                <Search className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-500")} />
            </div>
            {props.children}
        </components.Control>
    );
};

export const CustomSingleValue = (props: any) => {
    const { data } = props;
    const user = mockUsers.find(u => u.email === data.value);

    if (!user) return <components.SingleValue {...props} />;

    return (
        <components.SingleValue {...props}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                        getUserAvatarColor(user.id)
                    )}>
                        {user.name[0].toUpperCase()}
                    </div>
                    <span className="truncate text-[#FAFAFA] text-sm">{user.name}</span>
                </div>
                <span className="truncate text-[#AFAFAF]">{user.email}</span>
            </div>
        </components.SingleValue>
    );
};

export const CustomMultiValue = (props: any) => {
    const { data } = props;
    const user = mockUsers.find(u => u.email === data.value);

    if (!user) return <components.MultiValue {...props} />;

    return (
        <components.MultiValue {...props}>
            <div className="flex items-center gap-2">
                <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    getUserAvatarColor(user.id)
                )}>
                    {user.name[0].toUpperCase()}
                </div>
                <span className="truncate text-[#FAFAFA] my-0 text-sm">{user.name}</span>
            </div>
        </components.MultiValue >
    );
};
