import * as sql from "mssql";
import * as config from "config";
import { createFilter, createQuery, SQLLang } from "../lib/index";
import { Edm, odata, ODataController, ODataServer, ODataQuery, ODataErrorHandler, ResourceNotFoundError, createODataServer } from "odata-v4-server";

let db:sql.config = <sql.config>config.get<sql.config>("sqlConfig");
const connection:sql.Connection = new sql.Connection(db);

@Edm.OpenType
class User{
    @Edm.Key
    @Edm.Computed
    @Edm.Int32
    Id:number

    @Edm.String
    FirstName:string

    @Edm.String
    LastName:string

    @Edm.String
    Email:string
}

@odata.type(User)
class UsersController extends ODataController{
    @odata.GET
    async getUsers(@odata.stream stream, @odata.query query){
        let request = new sql.Request(connection);
        let output = request.pipe(stream);

        let sqlQuery = createQuery(query);
        sqlQuery.parameters.forEach((value, name) => request.input(name, value));

        request.query(sqlQuery.from("Users"));
        return output;
    }

    @odata.GET
    async getUser(@odata.key id:number, @odata.stream stream, @odata.query query){
        let request = new sql.Request(connection);

        let sqlQuery = createQuery(query);
        sqlQuery.parameters.forEach((value, name) => request.input(name, value));
        request.input("id", id);

        let result = await request.query(`SELECT ${sqlQuery.select} FROM Users WHERE Id = @id AND (${sqlQuery.where})`);
        return result[0];
    }
}

class UserProfilesController extends ODataController{
    @odata.GET
    async getUserProfiles(@odata.stream stream, @odata.query query){
        let request = new sql.Request(connection);
        let output = request.pipe(stream);

        let sqlQuery = createQuery(query);
        sqlQuery.parameters.forEach((value, name) => request.input(name, value));

        request.query(sqlQuery.from("UserProfiles"));
        return output;
    }

    @odata.GET
    async getUserProfile(@odata.key id:number, @odata.stream stream, @odata.query query){
        let request = new sql.Request(connection);

        let sqlQuery = createQuery(query);
        sqlQuery.parameters.forEach((value, name) => request.input(name, value));
        request.input("id", id);

        let result = await request.query(`SELECT ${sqlQuery.select} FROM UserProfiles WHERE Id = @id AND (${sqlQuery.where})`);
        return result[0];
    }
}

@odata.cors
@odata.controller(UsersController, true)
@odata.controller(UserProfilesController, true)
class SqlServer extends ODataServer{}

connection.connect().then(() => {
    SqlServer.create("/odata", 3003);
});