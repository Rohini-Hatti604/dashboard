"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.get = get;
exports.list = list;
exports.update = update;
exports.$delete = $delete;
var PlainFetcher_1 = require("@nestia/fetcher/lib/PlainFetcher");
/**
 * @controller UserVariableController.create
 * @path POST /user-variable/create
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
function create(connection, inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PlainFetcher_1.PlainFetcher.fetch(__assign(__assign({}, connection), { headers: __assign(__assign({}, connection.headers), { "Content-Type": "application/json" }) }), __assign(__assign({}, create.METADATA), { template: create.METADATA.path, path: create.path() }), inputs)];
        });
    });
}
(function (create) {
    create.METADATA = {
        method: "POST",
        path: "/user-variable/create",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 201,
    };
    create.path = function () { return "/user-variable/create"; };
})(create || (exports.create = create = {}));
/**
 * @controller UserVariableController.get
 * @path GET /user-variable/get
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
function get(connection, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PlainFetcher_1.PlainFetcher.fetch(connection, __assign(__assign({}, get.METADATA), { template: get.METADATA.path, path: get.path(query) }))];
        });
    });
}
(function (get) {
    get.METADATA = {
        method: "GET",
        path: "/user-variable/get",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    get.path = function (query) {
        var e_1, _a;
        var variables = new URLSearchParams();
        var _loop_1 = function (key, value) {
            if (undefined === value)
                return "continue";
            else if (Array.isArray(value))
                value.forEach(function (elem) { return variables.append(key, String(elem)); });
            else
                variables.set(key, String(value));
        };
        try {
            for (var _b = __values(Object.entries(query)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                _loop_1(key, value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var location = "/user-variable/get";
        return 0 === variables.size
            ? location
            : "".concat(location, "?").concat(variables.toString());
    };
})(get || (exports.get = get = {}));
/**
 * @controller UserVariableController.list
 * @path POST /user-variable/list
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
function list(connection, inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PlainFetcher_1.PlainFetcher.fetch(__assign(__assign({}, connection), { headers: __assign(__assign({}, connection.headers), { "Content-Type": "application/json" }) }), __assign(__assign({}, list.METADATA), { template: list.METADATA.path, path: list.path() }), inputs)];
        });
    });
}
(function (list) {
    list.METADATA = {
        method: "POST",
        path: "/user-variable/list",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 201,
    };
    list.path = function () { return "/user-variable/list"; };
})(list || (exports.list = list = {}));
/**
 * @controller UserVariableController.update
 * @path POST /user-variable/update
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
function update(connection, inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PlainFetcher_1.PlainFetcher.fetch(__assign(__assign({}, connection), { headers: __assign(__assign({}, connection.headers), { "Content-Type": "application/json" }) }), __assign(__assign({}, update.METADATA), { template: update.METADATA.path, path: update.path() }), inputs)];
        });
    });
}
(function (update) {
    update.METADATA = {
        method: "POST",
        path: "/user-variable/update",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 201,
    };
    update.path = function () { return "/user-variable/update"; };
})(update || (exports.update = update = {}));
/**
 * @controller UserVariableController.$delete
 * @path DELETE /user-variable/delete
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
function $delete(connection, inputs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PlainFetcher_1.PlainFetcher.fetch(__assign(__assign({}, connection), { headers: __assign(__assign({}, connection.headers), { "Content-Type": "application/json" }) }), __assign(__assign({}, $delete.METADATA), { template: $delete.METADATA.path, path: $delete.path() }), inputs)];
        });
    });
}
(function ($delete) {
    $delete.METADATA = {
        method: "DELETE",
        path: "/user-variable/delete",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    $delete.path = function () { return "/user-variable/delete"; };
})($delete || (exports.$delete = $delete = {}));
//# sourceMappingURL=index.js.map