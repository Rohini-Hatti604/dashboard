import { Separator } from "../../ui/separator";
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
import CommonQueryBuilder from "./CommonQueryBuilder";

const QUERY_FIELDS = [
  { label: "CVE ID", value: "cveId" },
  { label: "Severity", value: "severity" },
  { label: "Package", value: "package" },
  { label: "Version", value: "version" },
  { label: "Last detected", value: "lastDetected" },
];

const QUERY_OPERATORS = [
  { label: "is", value: "is" },
  { label: "=", value: "=" },
  { label: "!=", value: "!=" },
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
  { label: "contains", value: "contains" },
  { label: "not contains", value: "not_contains" },
];

const AdvancedSearchQueryBuilder = ({ open, onOpenChange, query, setQuery }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: any;
  setQuery: (q: any) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="!max-w-3xl !w-[900px] p-6 flex flex-col h-full">
        <SheetTitle className="text-lg font-semibold mb-4">Query Builder</SheetTitle>
        <div className="flex-1 overflow-auto">
          <CommonQueryBuilder
            fields={QUERY_FIELDS}
            value={query}
            onChange={setQuery}
          // operators={QUERY_OPERATORS}
          />
        </div>
        {/* Separator */}
        <Separator className=" bg-[#363636]" />
        {/* Footer with Cancel and Apply buttons */}
        <div className="flex flex-row justify-end items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center px-5 py-2 w-20  bg-[#282828] border border-[#363636] rounded text-[#FAFAFA] text-sm font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center px-5 py-2 w-20 bg-[#039BE6] rounded text-[#FAFAFA] text-sm font-medium cursor-pointer"
          >
            Apply
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedSearchQueryBuilder;