"use client"

import TicketShareResponseSection from "@/components/sections/sidebar-sheet/new-ticket/TicketShareResponse.section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React, { useState } from "react";
import { z } from "zod";
import { MultiEmailAutocomplete } from "../../../inputs/multi-email-autocomplete";
import { SingleEmailAutocomplete } from "../../../inputs/single-email-autocomplete";
import {
    FormErrors,
    SidebarSheetProps,
} from "../utils/side-sheet.types";
import { ErrorMessage } from "./error-message";
import { StepIndicator } from "./step-indicator";
import TicketInformationSection from "./TicketInformation.section";

// Zod schemas for each step
const step1Schema = z.object({
    user: z.string().email("Please enter a valid email address").min(1, "To field is required"),
    cc: z.union([
        z.string().optional(),
        z.array(z.string().email("Please enter valid email addresses"))
    ]).optional().refine((val) => {
        if (!val) return true;
        if (typeof val === "string") {
            if (val.trim() === "") return true;
            const emails = val.split(",").map(email => email.trim());
            return emails.every(email => z.string().email().safeParse(email).success);
        }
        if (Array.isArray(val)) {
            return val.every(email => z.string().email().safeParse(email).success);
        }
        return true;
    }, "Please enter valid email addresses"),
    ticketUser: z.enum(["alert-all", "alert-to-user", "do-not-send-alert"], {
        required_error: "Please select a ticket user option",
    }),
});

const step2Schema = z.object({
    ticketSource: z.enum(["phone", "email", "others"], {
        required_error: "Please select a ticket source",
    }),
    helpTopic: z.string().optional(),
    department: z.string().optional(),
    slaPlan: z.string().optional(),
    dueDate: z.date().optional(),
    assignTo: z.string().optional(),
    priority: z.enum(["low", "medium", "high", "critical"], {
        required_error: "Please select a priority",
    }),
});

const step3Schema = z.object({
    cannedResponse: z.string().optional(),
    status: z.enum(["open", "resolved", "closed"], {
        required_error: "Please select a ticket status",
    }),
    response: z.string().optional(),
    signature: z.string().optional(),
    internalNote: z.string().optional(),
    append: z.boolean().optional(),
});

// Combined schema for final validation
const completeFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// TypeScript types
type CompleteFormData = z.infer<typeof completeFormSchema>;

// Main form component
const CreateTicket: React.FC<SidebarSheetProps> = ({ open, onOpenChange }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data state
    const [formData, setFormData] = useState<Partial<CompleteFormData>>({
        user: "",
        cc: [],
        ticketUser: undefined,
        ticketSource: undefined,
        helpTopic: "",
        department: "",
        slaPlan: "",
        dueDate: undefined,
        assignTo: "",
        priority: undefined,
        cannedResponse: "",
        status: "open",
        response: "",
        signature: "none",
        internalNote: "",
        append: false,
    });

    // Mock data for TicketShareResponseSection
    const cannedResponses = [
        { label: "Welcome Message", value: "welcome" },
        { label: "Troubleshooting Steps", value: "troubleshoot" },
        { label: "Escalation Notice", value: "escalate" },
        { label: "Resolution Confirmation", value: "resolution" },
        { label: "Follow-up Request", value: "followup" },
    ];

    const signatures = [
        { label: "None", value: "none" },
        { label: "Department Signature", value: "department" },
        { label: "Personal Signature", value: "personal" },
    ];

    // Update form data
    const updateFormData = (field: keyof CompleteFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Handle TicketShareResponseSection data updates
    const handleTicketShareDataUpdate = (data: any) => {
        setFormData(prev => ({
            ...prev,
            cannedResponse: data.cannedResponse,
            status: data.status,
            response: data.response,
            signature: data.signature,
            internalNote: data.internalNote,
        }));
    };

    // Validate current step
    const validateCurrentStep = (): boolean => {
        let schema: z.ZodSchema;
        let stepData: any;

        switch (currentStep) {
            case 1:
                schema = step1Schema;
                stepData = {
                    user: formData.user,
                    cc: formData.cc,
                    ticketUser: formData.ticketUser,
                };
                break;
            case 2:
                schema = step2Schema;
                stepData = {
                    ticketSource: formData.ticketSource,
                    helpTopic: formData.helpTopic,
                    department: formData.department,
                    slaPlan: formData.slaPlan,
                    dueDate: formData.dueDate,
                    assignTo: formData.assignTo,
                    priority: formData.priority,
                };
                break;
            case 3:
                schema = step3Schema;
                stepData = {
                    cannedResponse: formData.cannedResponse,
                    status: formData.status,
                    response: formData.response,
                    signature: formData.signature,
                    internalNote: formData.internalNote,
                    append: formData.append,
                };
                break;
            default:
                return false;
        }

        const result = schema.safeParse(stepData);

        if (!result.success) {
            const newErrors: FormErrors = {};
            result.error.errors.forEach((error) => {
                if (error.path.length > 0) {
                    newErrors[error.path[0] as string] = error.message;
                }
            });
            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    // Handle next step
    const handleNext = () => {
        if (validateCurrentStep()) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps(prev => [...prev, currentStep]);
            }
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    // Handle previous step
    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateCurrentStep()) return;

        // Validate entire form
        const result = completeFormSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: FormErrors = {};
            result.error.errors.forEach((error) => {
                if (error.path.length > 0) {
                    newErrors[error.path[0] as string] = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Reset form and close
            setFormData({
                user: "",
                cc: [],
                ticketUser: undefined,
                ticketSource: undefined,
                helpTopic: "",
                department: "",
                slaPlan: "",
                dueDate: undefined,
                assignTo: "",
                priority: undefined,
                cannedResponse: "",
                status: "open",
                response: "",
                signature: "none",
                internalNote: "",
                append: false,
            });
            setCurrentStep(1);
            setCompletedSteps([]);
            setErrors({});
            onOpenChange(false);

        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form when sheet closes
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setCurrentStep(1);
            setCompletedSteps([]);
            setErrors({});
            setFormData({
                user: "",
                cc: [],
                ticketUser: undefined,
                ticketSource: undefined,
                helpTopic: "",
                department: "",
                slaPlan: "",
                dueDate: undefined,
                assignTo: "",
                priority: undefined,
                cannedResponse: "",
                status: "open",
                response: "",
                signature: "none",
                internalNote: "",
                append: false,
            });
        }
        onOpenChange(newOpen);
    };

    // Render Step 1: Email Information
    const renderStep1 = () => (
        <div className="space-y-6">
            <SingleEmailAutocomplete
                id="to"
                label="User"
                value={formData.user || ""}
                onChange={(value: string) => updateFormData("user", value)}
                placeholder="Add or search existing user"
                error={errors.user}
                required={true}
            />

            <MultiEmailAutocomplete
                id="cc"
                label="CC"
                value={Array.isArray(formData.cc) ? formData.cc : []}
                onChange={(value: string[]) => updateFormData("cc", value)}
                placeholder="No contacts selected"
                error={errors.cc}
            />

            <div className="space-y-2">
                <Label className="text-sm font-medium">
                    Ticket Users
                </Label>
                <RadioGroup
                    value={formData.ticketUser || ""}
                    onValueChange={(value) => updateFormData("ticketUser", value as "alert-all" | "alert-to-user" | "do-not-send-alert")}
                    className="flex flex-row gap-6"
                >
                    <label className={`flex items-center space-x-2 ${formData.ticketUser === "alert-all" ? "opacity-100" : "opacity-80"}`}>
                        <RadioGroupItem value="alert-all" id="alert-all" />
                        <span className="text-sm font-normal">Alert All</span>
                    </label>

                    <label className={`flex items-center space-x-2 ${formData.ticketUser === "alert-to-user" ? "opacity-100" : "opacity-80"}`}>
                        <RadioGroupItem value="alert-to-user" id="alert-to-user" />
                        <span className="text-sm font-normal">Alert To User</span>
                    </label>

                    <label className={`flex items-center space-x-2 ${formData.ticketUser === "do-not-send-alert" ? "opacity-100" : "opacity-80"}`}>
                        <RadioGroupItem value="do-not-send-alert" id="do-not-send-alert" />
                        <span className="text-sm font-normal">Do Not Send Alert</span>
                    </label>
                </RadioGroup>
                <ErrorMessage message={errors.ticketUser} />
            </div>
        </div>
    );

    // Render Step 2: Ticket Information and Options
    const renderStep2 = () => (
        <TicketInformationSection updateFormData={updateFormData} formData={formData} errors={errors} />
    );

    // Render Step 3: Share Response and Status
    const renderStep3 = () => (
        <div className="space-y-6">
            {/* TicketShareResponseSection */}
            <div className="mt-8">
                <TicketShareResponseSection
                    cannedResponses={cannedResponses}
                    signatures={signatures}
                    onSubmit={handleTicketShareDataUpdate}
                    onBack={handlePrevious}
                    showButtons={false}
                    initialData={{
                        cannedResponse: formData.cannedResponse || "",
                        status: formData.status || "open",
                        response: formData.response || "",
                        signature: formData.signature || "none",
                        internalNote: formData.internalNote || "",
                        append: formData.append || false,
                    }}
                />
            </div>
        </div>
    );

    // Main render
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent className="min-w-1/2 h-screen max-w-2xl p-5 flex flex-col dark:bg-[#1a1c1e]">
                <SheetHeader>
                    <SheetTitle>Open a New Ticket</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col justify-between h-full">
                    <div>
                        <StepIndicator
                            currentStep={currentStep}
                            totalSteps={3}
                        />

                        <div className="mt-8">
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                        </div>
                    </div>
                    <div className="flex border-t justify-end gap-5 pt-5 -mx-5 px-5">
                        <Button
                            type="button"
                            onClick={currentStep === 1 ? () => handleOpenChange(false) : handlePrevious}
                            className="bg-[#282828] hover:bg-[#363636] border border-[#363636] text-[#FAFAFA] font-bold cursor-pointer rounded px-5 py-2"
                        >
                            {currentStep === 1 ? "Cancel" : "Back"}
                        </Button>

                        <div className="flex gap-2">
                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className="w-20 bg-[#039BE6] hover:bg-[#0284c7] text-[#FAFAFA] font-bold cursor-pointer rounded px-5 py-2"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-[#039BE6] hover:bg-[#0284c7] text-[#FAFAFA] font-bold cursor-pointer rounded"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CreateTicket;
