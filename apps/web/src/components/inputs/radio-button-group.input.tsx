import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";

interface RadioButtonGroupInputProps {
    // Define the props for the RadioGroupInput component
    options: { label: string | React.ReactNode; value: string }[];
    name: string;
    label?: string | React.ReactNode;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    required?: boolean;
}

function RadioButtonGroupInput({ options, name, label, value, onChange, error, required = false }: RadioButtonGroupInputProps) {
    return (
        <div className="space-y-2 w-full flex flex-col justify-center">
            {label && (
                <Label htmlFor={name} className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-600 dark:text-red-400">*</span>}
                </Label>
            )}
            <RadioGroup
                value={value || ""}
                onValueChange={(value) => onChange && onChange(value)}
                className="flex flex-row gap-6 w-full"
            >
                {
                    options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option.value}
                                id={`${name}-${option.value}`}
                                className="h-4 w-4"
                            />
                            <Label htmlFor={`${name}-${option.value}`} className="text-sm">
                                {option.label}
                            </Label>
                        </div>
                    ))
                }

            </RadioGroup>
            {error && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}

function RadioButtonGroupVerticalInput({ options, name, label, value, onChange, error, required = false }: RadioButtonGroupInputProps) {
    return (
        <div className="space-y-2 w-full flex flex-col justify-center">
            {label && (
                <Label htmlFor={name} className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-600 dark:text-red-400">*</span>}
                </Label>
            )}
            <RadioGroup
                value={value || ""}
                onValueChange={(value) => onChange && onChange(value)}
                className="flex flex-col gap-6 w-full"
            >
                {
                    options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option.value}
                                id={`${name}-${option.value}`}
                                className="h-4 w-4"
                            />
                            <Label htmlFor={`${name}-${option.value}`} className="text-sm">
                                {option.label}
                            </Label>
                        </div>
                    ))
                }

            </RadioGroup>
            {error && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}

RadioButtonGroupInput.Vertical = RadioButtonGroupVerticalInput



export default RadioButtonGroupInput