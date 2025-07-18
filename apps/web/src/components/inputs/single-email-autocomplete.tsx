import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import React from "react";
import ReactSelect from "react-select";
import { ErrorMessage } from "../sections/sidebar-sheet/new-ticket/error-message";
import { userOptions } from "../sections/sidebar-sheet/utils/mock-data";
import { getSingleSelectStyles } from "../sections/sidebar-sheet/utils/select-styles";
import { SingleEmailAutocompleteProps } from "../sections/sidebar-sheet/utils/side-sheet.types";
import { CustomControl, CustomOption, CustomSingleValue } from "./react-select/custom-option";

// Single Email Autocomplete using react-select
export const SingleEmailAutocomplete: React.FC<SingleEmailAutocompleteProps> = ({
    value,
    onChange,
    placeholder,
    error,
    id,
    label,
}) => {
    // Find selected option
    const selectedOption = userOptions.find(option => option.value === value) || null;

    // Filter options based on search
    const filterOption = (option: any, inputValue: string) => {
        if (!inputValue) return true;
        const searchTerm = inputValue.toLowerCase();
        return (
            option.data.name.toLowerCase().includes(searchTerm) ||
            option.data.email.toLowerCase().includes(searchTerm)
        );
    };

    // Get current theme
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Get custom styles
    const customStyles = getSingleSelectStyles(isDark);

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium">
                {label}
            </Label>
            <ReactSelect
                inputId={id}
                value={selectedOption}
                onChange={(option: any) => onChange(option?.value || "")}
                options={userOptions}
                placeholder={placeholder}
                isSearchable
                isClearable
                filterOption={filterOption}
                components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                    Control: CustomControl,
                }}
                noOptionsMessage={() => "No users found"}
                styles={customStyles}
                classNamePrefix="react-select"
            />
            <ErrorMessage message={error} />
        </div>
    );
};
