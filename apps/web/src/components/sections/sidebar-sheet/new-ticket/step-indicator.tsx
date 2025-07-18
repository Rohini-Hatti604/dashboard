import { cn } from "@/lib/utils";
import React from "react";
import { StepIndicatorProps } from "../utils/side-sheet.types";

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
    const stepTitles = [
        "User and Collaborators",
        "Ticket Information and Options",
        "Share Response and Status"
    ];

    return (
        <div className="flex items-center mb-8 overflow-x-auto">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCurrent = stepNumber === currentStep;
                const isLast = stepNumber === totalSteps;

                return (
                    <div key={stepNumber} className="flex items-center whitespace-nowrap">
                        <div
                            className={cn(
                                "text-sm font-medium transition-colors",
                                isCurrent
                                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400 pb-0.5"
                                    : "text-gray-400 dark:text-gray-500"
                            )}
                        >
                            {stepTitles[index]}
                        </div>
                        {!isLast && (
                            <span className="mx-4 text-gray-400 dark:text-gray-500">&gt;</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;
