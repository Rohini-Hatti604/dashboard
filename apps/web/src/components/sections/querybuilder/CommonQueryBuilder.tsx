import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ActionProps, CombinatorSelectorProps, FieldSelectorProps, OperatorSelectorProps, QueryBuilder, ValueEditorProps } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

// Render value editor for custom fields
// This function handles rendering the appropriate input based on the field type and operator
const renderValueEditorByField = (props: ValueEditorProps) => {
  const { operator, value, handleOnChange, field } = props;

  // Return null for operators that don't need value input
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  // Helper function to render the appropriate input based on field type
  const renderInputByField = (val: string, onChange: (value: string) => void, placeholder?: string) => {
    if (field === 'severity') {
      return (
        <Select value={val} onValueChange={onChange}>
          <SelectTrigger className="dark:bg-transparent dark:hover:border-primary w-full bg-[#161616] value-select-unique">
            <SelectValue placeholder={placeholder || "Select Value"}>{val}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">LOW</SelectItem>
            <SelectItem value="HIGH">HIGH</SelectItem>
            <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === 'created_date') {
      return (
        <Input
          type="date"
          className="dark:bg-transparent border dark:border-[#363636] dark:hover:border-primary bg-[#161616] value-input-unique flex-1"
          placeholder={placeholder}
          value={val}
          onChange={e => onChange(e.target.value)}
        />
      );
    }

    return (
      <Input
        type="text"
        className="dark:bg-transparent border dark:border-[#363636] dark:hover:border-primary bg-[#161616] value-input-unique flex-1"
        placeholder={placeholder}
        value={val}
        onChange={e => onChange(e.target.value)}
      />
    );
  };

  // Handle between/notBetween (two inputs)
  if (["between", "notBetween"].includes(operator)) {
    const values = Array.isArray(value) ? value : [value || '', ''];
    const updateValue = (idx: number, newVal: string) => {
      const newValues = [...values];
      newValues[idx] = newVal;
      handleOnChange(newValues);
    };
    return (
      <div className="flex items-center gap-2">
        {renderInputByField(values[0] || '', (val) => updateValue(0, val), "Min value")}
        <span className="text-sm text-muted-foreground">and</span>
        {renderInputByField(values[1] || '', (val) => updateValue(1, val), "Max value")}
      </div>
    );
  }

  // Handle in/notIn (multi-value)
  if (["in", "notIn"].includes(operator)) {
    // For severity, use multi-select with buttons
    if (field === 'severity') {
      const options = ["LOW", "HIGH", "EMERGENCY"];
      const selected = Array.isArray(value) ? value : value ? value.split(',') : [];
      const toggleValue = (val: string) => {
        let newSelected = selected.includes(val)
          ? selected.filter((v: string) => v !== val)
          : [...selected, val];
        handleOnChange(newSelected);
      };
      return (
        <div className="flex gap-2">
          {options.map(opt => (
            <Button
              key={opt}
              type="button"
              variant={selected.includes(opt) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleValue(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      );
    }

    // For other fields, comma-separated input
    return (
      <Input
        type="text"
        className="dark:bg-transparent border dark:border-[#363636] dark:hover:border-primary bg-[#161616] value-input-unique"
        placeholder="Enter values separated by commas"
        value={Array.isArray(value) ? value.join(', ') : value}
        onChange={e => {
          const vals = e.target.value.split(',').map(v => v.trim()).filter(v => v);
          handleOnChange(vals);
        }}
      />
    );
  }

  // For single value operators, use field-specific inputs
  return renderInputByField(value || '', handleOnChange, "Enter Value");
}

// Custom Select for combinators/operators
const CustomSelect = ({ options, value, onChange, className, uniqueClass }: any) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className={`border dark:border-[#363636] bg-[#161616] dark:hover:border-primary ${className} ${uniqueClass || ''}`}>
      <SelectValue>
        {options.find((opt: any) => opt.value === value)?.label || "Select..."}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {options.map((option: any) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// Value input
const valueEditor = (props: ValueEditorProps) => {
  return renderValueEditorByField(props);
};

// Add/Remove buttons
const addGroupAction = (props: ActionProps) => (
  <Button variant="outline" size="sm" onClick={props.handleOnClick} className="border dark:border-[#363636] dark:bg-[#282828]dark:hover:border-primary px-4 py-1 add-group-btn-unique ">
    <IconPlus className="w-3 h-3 mr-2" /> Group
  </Button>
);

const addRuleAction = (props: ActionProps) => (
  <Button variant="outline" size="sm" onClick={props.handleOnClick} className="border dark:border-[#363636] dark:bg-[#282828]dark:hover:border-primary px-4 py-1 add-rule-btn-unique ">
    <IconPlus className="w-3 h-3 mr-2" /> Add
  </Button>
);

const removeGroupAction = (props: ActionProps) => (
  <Button variant="ghost" size="icon" onClick={props.handleOnClick} className="remove-group-btn-unique">
    <IconTrash className="w-4 h-4 text-#FAFAFA" />
  </Button>
);

const removeRuleAction = (props: ActionProps) => (
  <Button variant="ghost" size="icon" onClick={props.handleOnClick} className="remove-rule-btn-unique">
    <IconTrash className="w-4 h-4 text-#FAFAFA" />
  </Button>
);

// Field selector
const fieldSelector = (props: FieldSelectorProps) => (
  <CustomSelect options={props.options ?? []} value={props.value} onChange={props.handleOnChange} uniqueClass="field-select-unique" />
);

// Combinator selector
const combinatorSelector = (props: CombinatorSelectorProps) => (
  <CustomSelect options={props.options} value={props.value} onChange={props.handleOnChange} className="w-[100px]" uniqueClass="combinator-select-unique" />
);

// Operator selector
const operatorSelector = (props: OperatorSelectorProps) => (
  <CustomSelect options={props.options} value={props.value} onChange={props.handleOnChange} uniqueClass="operator-select-unique" />
);

// Helper function to get appropriate operators for each field type
const getOperatorsForField = (fieldName: string) => {
  switch (fieldName) {
    case 'severity':
      // For select/dropdown fields, only use comparison and list operators
      return [
        { name: '=', label: 'equals' },
        { name: '!=', label: 'does not equal' },
        { name: 'in', label: 'in' },
        { name: 'notIn', label: 'not in' },
        { name: 'null', label: 'is null' },
        { name: 'notNull', label: 'is not null' },
      ];
    case 'created_date':
      // For date fields, use comparison and range operators
      return [
        { name: '=', label: 'on' },
        { name: '!=', label: 'not on' },
        { name: '<', label: 'before' },
        { name: '<=', label: 'on or before' },
        { name: '>', label: 'after' },
        { name: '>=', label: 'on or after' },
        { name: 'between', label: 'between' },
        { name: 'notBetween', label: 'not between' },
        { name: 'null', label: 'is null' },
        { name: 'notNull', label: 'is not null' },
      ];
    default:
      // For text and other fields, use text-based operators
      return [
        { name: '=', label: 'equals' },
        { name: '!=', label: 'does not equal' },
        { name: '<', label: 'less than' },
        { name: '>', label: 'greater than' },
        { name: '<=', label: 'less than or equal' },
        { name: '>=', label: 'greater than or equal' },
        { name: 'contains', label: 'contains' },
        { name: 'beginsWith', label: 'begins with' },
        { name: 'endsWith', label: 'ends with' },
        { name: 'doesNotContain', label: 'does not contain' },
        { name: 'doesNotBeginWith', label: 'does not begin with' },
        { name: 'doesNotEndWith', label: 'does not end with' },
        { name: 'between', label: 'between' },
        { name: 'notBetween', label: 'not between' },
        { name: 'in', label: 'in' },
        { name: 'notIn', label: 'not in' },
        { name: 'null', label: 'is null' },
        { name: 'notNull', label: 'is not null' },
      ];
  }
};

// Enhanced field configuration with field-specific operators
const enhanceFieldsWithOperators = (fields: any[]) => {
  return fields.map(field => ({
    ...field,
    operators: getOperatorsForField(field.name)
  }));
};

// The main QueryBuilder component
const CommonQueryBuilder = ({ fields, value, onChange, ...props }: any) => {
  // Enhance fields with field-specific operators
  const enhancedFields = fields ? enhanceFieldsWithOperators(fields) : [];

  return (
    <div className="space-y-4 h-full">
      <div className="bg-[#242424] rounded-lg border">
        {fields && (
          <QueryBuilder
            fields={enhancedFields}
            query={value}
            onQueryChange={onChange}
            controlElements={{
              // ruleGroup: (props) => (
              //   <CustomRuleGroup
              //     {...props}
              //     addGroup={addGroupAction}
              //     addRule={addRuleAction}
              //     combinatorSelector={combinatorSelector}
              //   />
              // ),
              addGroupAction,
              addRuleAction,
              removeGroupAction,
              removeRuleAction,
              fieldSelector,
              combinatorSelector,
              operatorSelector,
              valueEditor,
            }}
            controlClassnames={{
              queryBuilder: "queryBuilder-branches ",
            }}
            {...props}
          />
        )}
      </div>
    </div>
  );
};

export default CommonQueryBuilder;