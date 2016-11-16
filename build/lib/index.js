"use strict";
const odata_v4_sql_1 = require("odata-v4-sql");
var odata_v4_sql_2 = require("odata-v4-sql");
exports.SQLLang = odata_v4_sql_2.SQLLang;
function createQuery(odataQuery, options = {}) {
    return odata_v4_sql_1.createQuery(odataQuery, options, odata_v4_sql_1.SQLLang.MsSql);
}
exports.createQuery = createQuery;
function createFilter(odataFilter, options = {}) {
    return odata_v4_sql_1.createFilter(odataFilter, options, odata_v4_sql_1.SQLLang.MsSql);
}
exports.createFilter = createFilter;
//# sourceMappingURL=index.js.map