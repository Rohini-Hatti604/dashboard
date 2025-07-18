import { useVariableStore } from "@/context/variables/variable.store";
import { useListUserVariableQuery } from "@/queries/user-variables/user-variables";
import dayjs, { ManipulateType } from "dayjs";

function useVariableFunctions(dashboardId?: string) {
  const { variables } = useVariableStore();
  const { data: userVariables } = useListUserVariableQuery(dashboardId ? {
    filters: {
      dashboardId: {
        equals: dashboardId,
      },
    },
  } : {});

  // console.log("User variables by dashboard" + dashboardId, userVariables);


  const MAX_INPUT_LENGTH = 10000; // Reasonable limit for input string
  const MAX_REPLACEMENTS = 100; // Prevent infinite replacements

  function sanitizeValue(value: string): string {
    // return DOMPurify?.sanitize(value);
    return value;
  }

  function getDateRangeFromString(value: string): string {
    if (typeof value !== "string") return "";

    // Strict pattern matching for date inputs
    const pattern = /^(\d{1,4})\s*(day|week|month|year)s?$/i;
    const match = value.match(pattern);
    if (!match) return value;

    const days = parseInt(match[1], 10);
    if (days <= 0 || days > 3650) return value; // Limit to reasonable range (10 years)

    const duration = match[2].toLowerCase() as ManipulateType;

    const today = dayjs();
    const fromDate = today.subtract(days, duration);

    return `[${fromDate.toISOString()} TO ${today.toISOString()}]`;
  }

  function populateUserVariables(name: string, match: string): string {
    if (!userVariables?.items) return sanitizeValue(match);

    const userVariable = userVariables.items.find(
      (variable) => variable.key === name
    );

    console.log("Selected variable", userVariable);

    if (!userVariable?.value) return sanitizeValue(match);

    switch (userVariable.type) {
      case "TEXT":
        return sanitizeValue(userVariable.value);
      case "NUMERICAL":
        return sanitizeValue(userVariable.value);
      case "TIME_BASED":
        return getDateRangeFromString(userVariable.value);
      default:
        return sanitizeValue(match);
    }
  }

  function populateVariables(inputString: string): string {
    if (typeof inputString !== "string") return "";
    if (inputString.length > MAX_INPUT_LENGTH) {
      console.warn("Input string exceeds maximum length");
      return "";
    }

    // Use a more specific regex pattern
    const placeholderRegex = /\[\[([\w\-\.]+)\]\]/g;
    let result = inputString;
    let replacements = 0;

    result = result.replace(placeholderRegex, (match, variableName) => {
      if (replacements >= MAX_REPLACEMENTS) {
        console.warn("Maximum replacements reached");
        return match;
      }
      replacements++;

      const trimmedVariableName = variableName.trim();
      const value =
        variables[trimmedVariableName] ||
        populateUserVariables(trimmedVariableName, match);

      return sanitizeValue(value);
    });

    return result;
  }

  function populateVariablesFromArray(
    inputString: string,
    variables: { key: string, value: string }[]
  ): string {
    if (typeof inputString !== "string") return "";
    if (inputString.length > MAX_INPUT_LENGTH) {
      console.warn("Input string exceeds maximum length");
      return "";
    }

    const placeholderRegex = /\[\[([\w\-\.]+)\]\]/g;
    let result = inputString;
    let replacements = 0;

    result = result.replace(placeholderRegex, (match, variableName) => {
      if (replacements >= MAX_REPLACEMENTS) {
        console.warn("Maximum replacements reached");
        return match;
      }
      replacements++;

      const trimmedVariableName = variableName.trim();
      const value = variables.find(
        (variable) => variable.key === trimmedVariableName
      );;

      return sanitizeValue(value?.value || match);
    });

    return result;
  }

  return { populateVariables, populateVariablesFromArray };
}

export default useVariableFunctions;
