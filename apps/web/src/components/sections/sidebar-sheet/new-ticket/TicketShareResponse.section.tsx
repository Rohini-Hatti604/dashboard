import React from "react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Separator } from "../../../ui/separator";
// Tiptap imports
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { List } from "lucide-react";
import { ChevronUp } from "tabler-icons-react";
import { ScrollArea } from "../../../ui/scroll-area";

interface TicketShareResponseSectionProps {
    cannedResponses: { label: string; value: string }[];
    signatures: { label: string; value: string }[];
    onSubmit?: (data: any) => void;
    onBack?: () => void;
    initialData?: {
        cannedResponse: string;
        status: string;
        response: string;
        signature: string;
        internalNote: string;
        append: boolean;
    };
    showButtons?: boolean;
}

const statusOptions = [
    { label: "Open", value: "open" },
    { label: "Resolved", value: "resolved" },
    { label: "Closed", value: "closed" },
];

const TicketShareResponseSection: React.FC<TicketShareResponseSectionProps> = ({
    cannedResponses,
    signatures,
    onSubmit,
    onBack,
    initialData,
    showButtons = true,
}) => {
    const [cannedResponse, setCannedResponse] = React.useState<string>(initialData?.cannedResponse || "");
    const [status, setStatus] = React.useState<string>(initialData?.status || "open");
    const [signature, setSignature] = React.useState<string>(initialData?.signature || signatures[0]?.value || "none");
    const [append, setAppend] = React.useState<boolean>(initialData?.append || false);
    const [noteOpen, setNoteOpen] = React.useState<boolean>(false);

    const editorExtensions = [
        StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: 'list-disc ml-4',
                },
            },
        }),
        Bold,
        Italic,
        Underline,
        Strike,
        Code,
        Link,
    ];

    const responseEditor = useEditor({
        extensions: editorExtensions,
        content: "",
        immediatelyRender: false,
    });

    const noteEditor = useEditor({
        extensions: editorExtensions,
        content: "",
        immediatelyRender: false,
    });

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                cannedResponse,
                status,
                response: responseEditor?.getHTML() || "",
                signature,
                internalNote: noteEditor?.getHTML() || "",
                append,
            });
        } else {
            console.log({
                cannedResponse,
                status,
                response: responseEditor?.getHTML() || "",
                signature,
                internalNote: noteEditor?.getHTML() || "",
                append,
            });
        }
    };

    return (
        <ScrollArea className="h-[calc(100vh-240px)] w-full">
            <div className="flex flex-col gap-5 w-full pr-4">
                {/* Canned Response + Append */}
                <div className="flex flex-row items-center w-full gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                        <Label className="text-[14px] text-[#FAFAFA]">Canned Response</Label>
                        <Select value={cannedResponse} onValueChange={setCannedResponse}>
                            <SelectTrigger className="w-full bg-[#161616] border-none text-[#FAFAFA]">
                                <SelectValue placeholder="No user selected" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161616] text-[#FAFAFA]">
                                {cannedResponses.map((cr) => (
                                    <SelectItem key={cr.value} value={cr.value} className="hover:bg-[#282828]">{cr.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-6">
                        <Checkbox id="append" checked={append} onCheckedChange={val => setAppend(val === true)} />
                        <Label htmlFor="append" className="text-[#FAFAFA] text-[14px]">Append</Label>
                    </div>
                </div>

                {/* Ticket Status */}
                <div className="flex flex-col gap-1 w-full">
                    <Label className="text-[14px] text-[#FAFAFA] flex items-center gap-1">
                        Ticket Status <span className="text-[#E93636]">*</span>
                    </Label>
                    <RadioGroup value={status} onValueChange={setStatus} className="flex flex-row gap-6 mt-1">
                        {statusOptions.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-2">
                                <RadioGroupItem value={opt.value} id={opt.value} />
                                <Label htmlFor={opt.value} className={opt.value === status ? "text-[#FAFAFA]" : "text-[#FAFAFA] opacity-60"}>{opt.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Response Editor */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[14px] text-[#FAFAFA]">Response</Label>
                    <div className="relative bg-[#1E2021] border border-[#363636] rounded-md p-0 min-h-[180px] max-h-[220px] cursor-text" onClick={() => responseEditor?.chain().focus().run()}>
                        <div className="flex flex-row items-center gap-2 border-b border-[#363636] px-2 py-1">
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleBold().run()} className={responseEditor?.isActive('bold') ? 'bg-[#282828]' : ''}><b>B</b></Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleItalic().run()} className={responseEditor?.isActive('italic') ? 'bg-[#282828]' : ''}><i>I</i></Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleUnderline().run()} className={responseEditor?.isActive('underline') ? 'bg-[#282828]' : ''}><u>U</u></Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleStrike().run()} className={responseEditor?.isActive('strike') ? 'bg-[#282828]' : ''}><s>S</s></Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleCode().run()} className={responseEditor?.isActive('code') ? 'bg-[#282828]' : ''}>{"< />"}</Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => responseEditor?.chain().focus().toggleBulletList().run()} className={responseEditor?.isActive('bulletList') ? 'bg-[#282828]' : ''}><List size={18} /></Button>
                            <Button variant="ghost" size="icon" type="button" onClick={() => {
                                if (!responseEditor) return;
                                const previousUrl = responseEditor.getAttributes('link').href || '';
                                const url = window.prompt('Enter URL', previousUrl);
                                if (url === null) return;
                                if (url === '') {
                                    responseEditor.chain().focus().extendMarkRange('link').unsetLink().run();
                                    return;
                                }
                                responseEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                            }} className={responseEditor?.isActive('link') ? 'bg-[#282828]' : ''}>
                                🔗
                            </Button>
                        </div>
                        {responseEditor && responseEditor.getText().trim() === "" && (
                            <span className="pointer-events-none absolute left-4 top-12 text-[#5A5C5E] text-[14px] select-none">
                                Type the initial response for the ticket
                            </span>
                        )}
                        <EditorContent
                            editor={responseEditor}
                            className="tiptap-editor px-4 py-2 text-[#FAFAFA] bg-transparent outline-none min-h-[140px] max-h-[180px] border-none focus:border-none focus:outline-none shadow-none w-full h-full"
                        />
                    </div>
                </div>

                {/* Signature */}
                <div className="flex flex-col gap-1 w-full">
                    <Label className="text-[14px] text-[#FAFAFA]">Signature</Label>
                    <RadioGroup value={signature} onValueChange={setSignature} className="flex flex-row gap-6 mt-1">
                        {signatures.map((sig) => (
                            <div key={sig.value} className="flex items-center gap-2">
                                <RadioGroupItem value={sig.value} id={sig.value} />
                                <Label htmlFor={sig.value} className={sig.value === signature ? "text-[#FAFAFA]" : "text-[#FAFAFA] opacity-60"}>{sig.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Internal Note */}
                <div className="flex flex-col gap-2 w-full">
                    <button type="button" className="flex items-center gap-1 text-left focus:outline-none" onClick={() => setNoteOpen((open) => !open)}>
                        <Label className="text-[14px] text-[#FAFAFA] cursor-pointer select-none flex items-center gap-1">
                            Internal note (Optional)
                            <ChevronUp size={18} className={`transition-transform duration-200 ${noteOpen ? 'rotate-180' : ''}`} />
                        </Label>
                    </button>
                    {noteOpen && (
                        <div className="relative bg-[#1E2021] border border-[#363636] rounded-md p-0 min-h-[140px] max-h-[180px] cursor-text" onClick={() => noteEditor?.chain().focus().run()}>
                            <div className="flex flex-row items-center gap-2 border-b border-[#363636] px-2 py-1">
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleBold().run()} className={noteEditor?.isActive('bold') ? 'bg-[#282828]' : ''}><b>B</b></Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleItalic().run()} className={noteEditor?.isActive('italic') ? 'bg-[#282828]' : ''}><i>I</i></Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleUnderline().run()} className={noteEditor?.isActive('underline') ? 'bg-[#282828]' : ''}><u>U</u></Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleStrike().run()} className={noteEditor?.isActive('strike') ? 'bg-[#282828]' : ''}><s>S</s></Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleCode().run()} className={noteEditor?.isActive('code') ? 'bg-[#282828]' : ''}>{"< />"}</Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => noteEditor?.chain().focus().toggleBulletList().run()} className={noteEditor?.isActive('bulletList') ? 'bg-[#282828]' : ''}><List size={18} /></Button>
                                <Button variant="ghost" size="icon" type="button" onClick={() => {
                                    if (!noteEditor) return;
                                    const previousUrl = noteEditor.getAttributes('link').href || '';
                                    const url = window.prompt('Enter URL', previousUrl);
                                    if (url === null) return;
                                    if (url === '') {
                                        noteEditor.chain().focus().extendMarkRange('link').unsetLink().run();
                                        return;
                                    }
                                    noteEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                                }} className={noteEditor?.isActive('link') ? 'bg-[#282828]' : ''}>
                                    🔗
                                </Button>
                            </div>
                            {noteEditor && noteEditor.getText().trim() === "" && (
                                <span className="pointer-events-none absolute left-4 top-12 text-[#5A5C5E] text-[14px] select-none">
                                    Add an internal note (optional)
                                </span>
                            )}
                            <EditorContent
                                editor={noteEditor}
                                className="tiptap-editor px-4 py-2 text-[#FAFAFA] bg-transparent outline-none min-h-[140px] max-h-[180px] border-none focus:border-none focus:outline-none shadow-none w-full h-full"
                            />
                        </div>
                    )}
                </div>

                <Separator className="bg-[#363636]" />

                {/* Footer Buttons */}
                {showButtons && (
                    <div className="flex flex-row justify-end gap-3 w-full mt-4">
                        <Button variant="outline" className="bg-[#282828] border-[#363636] text-[#FAFAFA]" onClick={onBack}>Back</Button>
                        <Button className="bg-[#039BE6] text-[#FAFAFA]" onClick={handleSubmit}>Submit</Button>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
};

export default TicketShareResponseSection;
