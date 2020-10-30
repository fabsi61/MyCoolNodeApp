// where we write our knex queries
/*const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
*/

//verbindung zur db über config file
const db = require('../dbConfig');
module.exports = {
    add,
    find,
    findById,
    remove,
    update, 
    addMessage,
    findLessonMessages,
    removeMessage,
    messageUpdate
};
//add, find, findbyId, remove, update
async function add(lesson) {
   const [id] = await  db('lessons').insert(lesson);
   return id;
};

function find(){
    return db('lessons');
};

function findById(id) {
    return db('lessons')
        .where({id: id})
        .first();
};

function remove(id){
    return db('lessons')
    .where({id: id})
    .del();
};

//gibt durch fidnbyid ganzes object zurück anstatt id
function update(id, changes){
    return (
        db('lessons')
        .where({id: id})
        .update(changes, [id])
        .then(() => {
            return findById(id);
        })
    )
};

function findMessageById(id){
    return db('messages')
        .where({id: id})
        .first();
};

async function addMessage(message, lesson_id){
    const [id] = await db('messages')
        .where({lesson_id: lesson_id})
        .insert(message);
    return findMessageById(id);
};
//2 tables werden gejoint
function findLessonMessages(lesson_id){
    return db('lessons as l')
    .join('messages as m', "l.id", "m.lesson_id")
    .select(
        "l.id as LessonID",
        "l.name as LessonName",
        "m.id as MessageID",
        "m.sender",
        "m.text"
    )
    .where({lesson_id: lesson_id});
        
};
//id der message wird übergeben
function removeMessage(id) {
    return db('messages')
    .where({id:id})
    .del();
};
function messageUpdate(id, changes){
    return (
        db('messages')
        .where({id: id})
        .update(changes, [id])
        .then(() => {
            return findMessageById(id);
        })
    )
};