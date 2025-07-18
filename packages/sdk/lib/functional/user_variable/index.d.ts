/**
 * @packageDocumentation
 * @module api.functional.user_variable
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
import type { IConnection } from "@nestia/fetcher";
import type { ICreateUserVariableRequest } from "../../structures/ICreateUserVariableRequest";
import type { IGetUserVariableRequest } from "../../structures/IGetUserVariableRequest";
import type { IListEntitiesRequestIUserVariable } from "../../structures/IListEntitiesRequestIUserVariable";
import type { IListEntitiesResponseIUserVariable } from "../../structures/IListEntitiesResponseIUserVariable";
import type { IUpdateUserVariableRequest } from "../../structures/IUpdateUserVariableRequest";
import type { IUserVariable } from "../../structures/IUserVariable";
/**
 * @controller UserVariableController.create
 * @path POST /user-variable/create
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function create(connection: IConnection, inputs: create.Input): Promise<create.Output>;
export declare namespace create {
    type Input = ICreateUserVariableRequest;
    type Output = IUserVariable;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/user-variable/create";
        readonly request: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 201;
    };
    const path: () => string;
}
/**
 * @controller UserVariableController.get
 * @path GET /user-variable/get
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function get(connection: IConnection, query: get.Query): Promise<get.Output>;
export declare namespace get {
    type Query = IGetUserVariableRequest;
    type Output = any;
    const METADATA: {
        readonly method: "GET";
        readonly path: "/user-variable/get";
        readonly request: null;
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 200;
    };
    const path: (query: get.Query) => string;
}
/**
 * @controller UserVariableController.list
 * @path POST /user-variable/list
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function list(connection: IConnection, inputs: list.Input): Promise<list.Output>;
export declare namespace list {
    type Input = IListEntitiesRequestIUserVariable;
    type Output = IListEntitiesResponseIUserVariable;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/user-variable/list";
        readonly request: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 201;
    };
    const path: () => string;
}
/**
 * @controller UserVariableController.update
 * @path POST /user-variable/update
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function update(connection: IConnection, inputs: update.Input): Promise<update.Output>;
export declare namespace update {
    type Input = IUpdateUserVariableRequest;
    type Output = any;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/user-variable/update";
        readonly request: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 201;
    };
    const path: () => string;
}
/**
 * @controller UserVariableController.$delete
 * @path DELETE /user-variable/delete
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function $delete(connection: IConnection, inputs: $delete.Input): Promise<$delete.Output>;
export declare namespace $delete {
    type Input = {
        id: string;
    };
    type Output = any;
    const METADATA: {
        readonly method: "DELETE";
        readonly path: "/user-variable/delete";
        readonly request: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 200;
    };
    const path: () => string;
}
