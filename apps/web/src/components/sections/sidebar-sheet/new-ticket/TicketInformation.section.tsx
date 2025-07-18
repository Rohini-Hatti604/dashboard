import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DatePicker } from "../../../inputs/date-picker";
import { ErrorMessage } from "./error-message";

const TicketInformationSection = ({ formData, updateFormData, errors }: any) => {
    const priorityOptions = [
        { id: "priority-low", value: "low", label: "Low" },
        { id: "priority-medium", value: "medium", label: "Medium" },
        { id: "priority-high", value: "high", label: "High" },
        { id: "priority-critical", value: "critical", label: "Critical" }
    ]
    return (
        <div className="space-y-6">
            {/* Two-column grid layout - each row has 2 fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1: Ticket Source & Help Topic */}
                <div className="space-y-2 w-full flex flex-col justify-between">
                    <Label className="text-sm">
                        Ticket Source <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                        value={formData.ticketSource || ""}
                        onValueChange={(value) => updateFormData("ticketSource", value as "phone" | "email" | "others")}
                        className="flex flex-row gap-6 w-full"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className={`text-sm ${formData.ticketSource === "phone" ? "" : "text-muted-foreground"}`}>Phone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email" className={`text-sm ${formData.ticketSource === "email" ? "" : "text-muted-foreground"}`}>Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="others" id="others" />
                            <Label htmlFor="others" className={`text-sm ${formData.ticketSource === "others" ? "" : "text-muted-foreground"}`}>Others</Label>
                        </div>
                    </RadioGroup>
                    <ErrorMessage message={errors.ticketSource} />
                </div>

                <div className="space-y-2 w-full flex flex-col justify-center">
                    <Label htmlFor="helpTopic" className="text-sm">
                        Help Topic
                    </Label>
                    <Select
                        value={formData.helpTopic || ""}
                        onValueChange={(value) => updateFormData("helpTopic", value)}
                    >
                        <SelectTrigger className={cn("w-full dark:bg-primary-foreground border-0", errors.helpTopic && "border-red-500")}>
                            <SelectValue placeholder="Feedback" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="bug-report">Bug Report</SelectItem>
                            <SelectItem value="feature-request">Feature Request</SelectItem>
                            <SelectItem value="technical-support">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage message={errors.helpTopic} />
                </div>

                {/* Row 2: Department & SLA Plan */}
                <div className="space-y-2 w-full flex flex-col justify-center">
                    <Label htmlFor="department" className="text-sm">
                        Department
                    </Label>
                    <Select
                        value={formData.department || ""}
                        onValueChange={(value) => updateFormData("department", value)}
                    >
                        <SelectTrigger className={cn("w-full dark:bg-primary-foreground border-0", errors.department && "border-red-500")}>
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage message={errors.department} />
                </div>

                <div className="space-y-2 w-full flex flex-col justify-center">
                    <Label htmlFor="slaPlan" className="text-sm">
                        SLA Plan
                    </Label>
                    <Select
                        value={formData.slaPlan || ""}
                        onValueChange={(value) => updateFormData("slaPlan", value)}
                    >
                        <SelectTrigger className={cn("w-full dark:bg-primary-foreground border-0", errors.slaPlan && "border-red-500")}>
                            <SelectValue placeholder="mm/dd/yyyy" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="standard">Standard (24 hours)</SelectItem>
                            <SelectItem value="priority">Priority (8 hours)</SelectItem>
                            <SelectItem value="urgent">Urgent (4 hours)</SelectItem>
                            <SelectItem value="critical">Critical (1 hour)</SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage message={errors.slaPlan} />
                </div>

                {/* Row 3: Due Date & Assign To */}
                <div className="space-y-2 w-full flex flex-col justify-center">
                    <DatePicker
                        id="dueDate"
                        label="Due Date"
                        value={formData.dueDate}
                        onChange={(date) => updateFormData("dueDate", date)}
                        placeholder="Select due date"
                        error={errors.dueDate}
                    />
                </div>

                <div className="space-y-2 w-full flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="assignTo" className="text-sm">
                            Assign To
                        </Label>
                        <button className="text-xs text-blue-500 cursor-pointer" onClick={() => updateFormData("assignTo", "john-doe")}>
                            Assign to me
                        </button>
                    </div>
                    <Select
                        value={formData.assignTo || ""}
                        onValueChange={(value) => updateFormData("assignTo", value)}
                    >
                        <SelectTrigger className={cn("w-full dark:bg-primary-foreground border-0", errors.assignTo && "border-red-500")}>
                            <SelectValue placeholder="Select an Agent OR a Team" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="john-doe">John Doe (Agent)</SelectItem>
                            <SelectItem value="jane-smith">Jane Smith (Agent)</SelectItem>
                            <SelectItem value="mike-johnson">Mike Johnson (Agent)</SelectItem>
                            <SelectItem value="engineering-team">Engineering Team</SelectItem>
                            <SelectItem value="support-team">Support Team</SelectItem>
                            <SelectItem value="sales-team">Sales Team</SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage message={errors.assignTo} />
                </div>

                {/* Row 4: Priority (spans 2 columns) */}
                <div className="space-y-2 w-full md:col-span-2 flex flex-col justify-center">
                    <Label className="text-sm">
                        Priority
                    </Label>
                    <RadioGroup
                        value={formData.priority || ""}
                        onValueChange={(value) => updateFormData("priority", value as "low" | "medium" | "high" | "critical")}
                        className="flex flex-col"
                    >
                        {priorityOptions.map(({ id, value, label }) => (
                            <div key={id} className="flex items-center space-x-3">
                                <RadioGroupItem value={value} id={id} />
                                <Label htmlFor={id} className="cursor-pointer">
                                    <div className={`priority-tag priority-${value}`}>
                                        <div className="priority-dot"></div>
                                        <span>{label}</span>
                                    </div>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <ErrorMessage message={errors.priority} />
                </div>
            </div>
        </div>
    );
}

export default TicketInformationSection;