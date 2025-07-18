import { createContext, useState } from "react";

interface IAppLayout {
    searchPlaceholder: string;
    setPlaceholder: (placeholder: string) => void;
    buttonIcon: boolean;
    setButtonIcon: (icon: boolean) => void;
}

export const LayoutContext = createContext<IAppLayout | null>(null)

export function LayoutProvider({children}: {children: React.ReactNode}) {
    const [placeholder, setPlaceholder] = useState("Search...");
    const [buttonIcon, setButtonIcon] = useState(false);
    return (
        <LayoutContext.Provider value={{searchPlaceholder: placeholder, setPlaceholder, buttonIcon, setButtonIcon}}>
            {children}
        </LayoutContext.Provider>
    );
}