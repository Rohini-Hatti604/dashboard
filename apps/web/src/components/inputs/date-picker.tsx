import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { ErrorMessage } from "../sections/sidebar-sheet/new-ticket/error-message";
import { DatePickerProps } from "../sections/sidebar-sheet/utils/side-sheet.types";

// DatePicker component
export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder,
    error,
    id,
    label,
    required = false
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal dark:bg-primary-foreground dark:hover:bg-primary-foreground dark:hover:text-muted-foreground border-0 cursor-pointer",
                            !value && "text-muted-foreground",
                            error && "border-red-500"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, "PPP") : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                    />
                </PopoverContent>
            </Popover>
            <ErrorMessage message={error} />
        </div>
    );
};

export default DatePicker;
