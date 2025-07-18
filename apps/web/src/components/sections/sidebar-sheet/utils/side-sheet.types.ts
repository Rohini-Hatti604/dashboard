// Type definitions for sidebar-sheet component

// User data type for react-select
export interface UserOption {
    value: string;
    label: string;
    id: number;
    email: string;
    name: string;
    department: string;
}

// Main component props
export interface SidebarSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// Form validation errors
export interface FormErrors {
    [key: string]: string | undefined;
    // Step 1 fields
    user?: string;
    cc?: string;
    ticketUser?: string;
    // Step 2 fields
    ticketSource?: string;
    helpTopic?: string;
    department?: string;
    slaPlan?: string;
    dueDate?: string;
    assignTo?: string;
    priority?: string;
    // Step 3 fields
    cannedResponse?: string;
    status?: string;
    response?: string;
    signature?: string;
    internalNote?: string;
    append?: string;
}

// Step indicator component props
export interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

// Single email autocomplete component props
export interface SingleEmailAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    error?: string;
    id: string;
    label: string;
    required?: boolean;
}

// Multi email autocomplete component props
export interface MultiEmailAutocompleteProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder: string;
    error?: string;
    id: string;
    label: string;
    required?: boolean;
}

// DatePicker component props
export interface DatePickerProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder: string;
    error?: string;
    id: string;
    label: string;
    required?: boolean;
}
