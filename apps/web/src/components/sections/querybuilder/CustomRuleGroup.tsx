import {
  RuleGroupBodyComponents,
  RuleGroupProps,
  useRuleGroup,
  ActionProps,
  CombinatorSelectorProps,
} from 'react-querybuilder';
import type { FC } from 'react';

type ExtendedRuleGroupProps = RuleGroupProps & {
  addRule?: FC<ActionProps>;
  addGroup?: FC<ActionProps>;
  combinatorSelector?: FC<CombinatorSelectorProps>;
  onPropChange?: (property: string, value: any, path: Array<string | number>) => void;
};

export const CustomRuleGroup = (props: ExtendedRuleGroupProps) => {
  const rg = useRuleGroup(props);

  return (
    <div className={rg.outerClassName}>
      {/* Top Combinator Only */}
      <div className={`${rg.classNames.header} custom-header-top`}>
        {props.combinatorSelector && rg.schema.combinators && (
          <props.combinatorSelector
            options={rg.schema.combinators}
            value={rg.ruleGroup.combinator}
            className={
              typeof rg.schema.classNames?.combinators === 'string'
                ? rg.schema.classNames.combinators
                : undefined
            }
            handleOnChange={(val) => props.onPropChange?.('combinator', val, rg.path)}
            rules={rg.ruleGroup.rules}
            level={rg.path.length}
            title="Group combinator"
            disabled={rg.disabled}
            path={rg.path}
            schema={rg.schema}
          />
        )}
      </div>

      {/* Rule Group Body */}
      <div className={rg.classNames.body}>
        <RuleGroupBodyComponents {...props} {...rg} />
      </div>

      {/* Bottom Add Rule/Add Group Buttons */}
      <div className="flex gap-2 px-4 py-2 custom-header-bottom">
        {props.addRule && rg.addRule && (
          <props.addRule
            label="Add Rule"
            handleOnClick={rg.addRule}
            disabled={rg.disabled}
            path={rg.path}
            level={rg.path.length}
            ruleOrGroup={rg.ruleGroup}
            schema={rg.schema}
          />
        )}
        {props.addGroup && rg.addGroup && (
          <props.addGroup
            label="Add Group"
            handleOnClick={rg.addGroup}
            disabled={rg.disabled}
            path={rg.path}
            level={rg.path.length}
            ruleOrGroup={rg.ruleGroup}
            schema={rg.schema}
          />
        )}
      </div>
    </div>
  );
};
