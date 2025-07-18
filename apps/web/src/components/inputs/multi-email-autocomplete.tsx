import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import React from "react";
import ReactSelect from "react-select";
import { ErrorMessage } from "../sections/sidebar-sheet/new-ticket/error-message";
import { userOptions } from "../sections/sidebar-sheet/utils/mock-data";
import { getMultiSelectStyles } from "../sections/sidebar-sheet/utils/select-styles";
import { MultiEmailAutocompleteProps, UserOption } from "../sections/sidebar-sheet/utils/side-sheet.types";
import { CustomControl, CustomMultiValue, CustomOption } from "./react-select/custom-option";

// Multi Email Autocomplete with react-select
export const MultiEmailAutocomplete: React.FC<MultiEmailAutocompleteProps> = ({
    value,
    onChange,
    placeholder,
    error,
    id,
    label,
    required = false
}) => {
    // Find selected options
    const selectedOptions = value.map(email =>
        userOptions.find(option => option.value === email)
    ).filter(Boolean) as UserOption[];

    // Filter options based on search and exclude already selected
    const filterOption = (option: any, inputValue: string) => {
        if (value.includes(option.data.value)) return false;
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
    const customStyles = getMultiSelectStyles(isDark);

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium">
                {label}
            </Label>
            <ReactSelect
                inputId={id}
                value={selectedOptions}
                onChange={(options: any) => {
                    const emails = options ? options.map((option: any) => option.value) : [];
                    onChange(emails);
                }}
                options={userOptions}
                placeholder={placeholder}
                isSearchable
                isMulti
                isClearable
                filterOption={filterOption}
                components={{
                    Option: CustomOption,
                    MultiValue: CustomMultiValue,
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
