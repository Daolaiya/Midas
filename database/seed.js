const {seed, randFullName, randFirstName, randSentence, randUserName, randLastName, randEmail} = require('@ngneat/falso');
const db = require("./db");

seed(123);

let mediaTypes = ["movie","show"];
let usernames = randUserName({length:10});
let mediaIds = ["tt0800369", "tt0903747", "tt0944947", "tt0163651", "tt0252866", "tt1605630", "tt0328828", "tt0144084", "tt0458339", "tt0103923", "tt0078937", "tt3498820", "tt9208876", "tt1843866", "tt0078938", "tt0232500", "tt1013752", "tt0031298", "tt5433138"]; 

function randomNumber(a,b){
    return Math.floor((b-a+1) * Math.random()) + 1;
}

async function generateMediaAndUserData(){
    for (let i = 0; i < mediaIds.length; i++) {
        await db.query(
            `INSERT INTO media (id, title, type, cast_list, description) VALUES ($1, $2, $3, $4, $5)`, [mediaIds[i], randFullName(), mediaTypes[Math.floor(Math.random()*2)], randFullName({length: 3}).join(", "), randSentence()]
        );
    }
    
    for (let i = 0; i < 10; i++){
        await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email, is_admin) VALUES ($1, $2, $3, $4, $5, $6)`,
            [usernames[i], "$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q", randFirstName(), randLastName(), randEmail(), false]
        );
    }
}

async function generateFavoritesData(){
    for (let i = 0; i < mediaIds.length; i++) {
        await db.query(`INSERT INTO favorites (username, media_id) VALUES ($1, $2)`, [usernames[i % 10], mediaIds[i]]);
    }
}

async function generateData(){
    await generateMediaAndUserData();
    await generateFavoritesData();
}

generateData();
