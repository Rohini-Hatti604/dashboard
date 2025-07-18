import type { Format } from "typia/lib/tags/Format";
export type EntityFilterRecord = {
    equals?: undefined | (string & Format<"date-time">) | string | number | boolean;
    not?: undefined | (string & Format<"date-time">) | string | number | boolean;
    in?: undefined | ((string & Format<"date-time">) | string | number | boolean)[];
    notIn?: undefined | ((string & Format<"date-time">) | string | number | boolean)[];
    lt?: undefined | (string & Format<"date-time">) | string | number;
    lte?: undefined | (string & Format<"date-time">) | string | number;
    gt?: undefined | (string & Format<"date-time">) | string | number;
    gte?: undefined | (string & Format<"date-time">) | string | number;
    contains?: undefined | string;
    startsWith?: undefined | string;
    endsWith?: undefined | string;
    mode?: undefined | "default" | "insensitive";
};
