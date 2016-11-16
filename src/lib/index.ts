import { SQLLang, createFilter as createFilterSQL, createQuery as createQuerySQL, SqlOptions } from "odata-v4-sql";
import { Visitor } from "odata-v4-sql/lib/visitor";
export { SQLLang, SqlOptions } from "odata-v4-sql";
import { Token } from "odata-v4-parser/lib/lexer";

/**
 * Creates an SQL query descriptor from an OData query string
 * @param {string} odataQuery - An OData query string
 * @return {string}  SQL query descriptor
 * @example
 * const filter = createQuery("$filter=Size eq 4 and Age gt 18");
 * let sqlQuery = `SELECT * FROM table WHERE ${filter.where}`;
 */
export function createQuery(odataQuery:string, options?:SqlOptions):Visitor;
export function createQuery(odataQuery:Token, options?:SqlOptions):Visitor;
export function createQuery(odataQuery:any, options = <SqlOptions>{}):Visitor{
    return createQuerySQL(odataQuery, options, SQLLang.MsSql);
}

/**
 * Creates an SQL WHERE clause from an OData filter expression string
 * @param {string} odataFilter - A filter expression in OData $filter format
 * @return {string}  SQL WHERE clause
 * @example
 * const filter = createFilter("Size eq 4 and Age gt 18");
 * let sqlQuery = `SELECT * FROM table WHERE ${filter}`;
 */
export function createFilter(odataFilter:string, options?:SqlOptions):Visitor;
export function createFilter(odataFilter:Token, options?:SqlOptions):Visitor;
export function createFilter(odataFilter:any, options = <SqlOptions>{}):Visitor{
    return createFilterSQL(odataFilter, options, SQLLang.MsSql);
}