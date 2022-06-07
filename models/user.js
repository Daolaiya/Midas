"use strict";

const bcrypt = require("bcrypt");

const db = require("../database/db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {NotFoundError, BadRequestError, UnauthorizedError} = require("../expressError");
const {BCRYPT_WORK_FACTOR} = require("../config.js");

class User {
    static async authenticate(username, password) {
        const result = await db.query(`SELECT username, password, first_name, last_name, email, is_admin FROM users WHERE username = $1`, [username]);
        const user = result.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username or password");
    }

    static async create({username, first_name, last_name, password, email, is_admin}) {
        const duplicateCheck = await db.query(`SELECT username FROM users WHERE username = $1`, [username]);
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate username: ${username}`);
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(`INSERT INTO users (username, first_name, last_name, password, email, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING username, first_name, last_name, password, email, is_admin`,
            [username, first_name, last_name, hashedPassword, email, is_admin]
        );
        const user = result.rows[0];
        return user;
    }

    static async get(username) {
        const userResult = await db.query(`SELECT username, first_name, last_name, email, is_admin FROM users WHERE username = $1`, [username]);
        const user = userResult.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
        const userFavoritesMediaResults = await db.query(`SELECT media_id FROM favorites WHERE username = $1`, [username]);
        user.favoriteMediaIds = userFavoritesMediaResults.rows.map((favorite) => favorite.media_id);
        return user;
    }

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
        const {query, values} = sqlForPartialUpdate(data);
        const usernameVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE users SET ${query}WHERE username = ${usernameVarIdx}RETURNING username, first_name, last_name, email, is_admin`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
        delete user.password;
        return user;
    }

    static async delete(username) {
        let result = await db.query(`DELETE FROM users WHERE username = $1 RETURNING username`, [username]);
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
    }
}

// Testing

//  1.
// async function test_1(){
//     // let x = await db.query("SELECT * FROM users");
//     let y = await User.get("Agata_Keller");
//     // console.log("HERE: ", typeof x, "\n", "X: ", x);
//     console.log("HERE: ", typeof y, "\n", "Y: ", y);
// }
// test_1();

// 2.
// async function test_2(){
//     // let x = await db.query("SELECT * FROM users");
//     let y = await User.get("Agata_Keller");
//     // console.log("HERE: ", typeof x, "\n", "X: ", x);
//     console.log("HERE: ", typeof y, "\n", "Y: ", y);
// }
// test_2();

module.exports = User;
