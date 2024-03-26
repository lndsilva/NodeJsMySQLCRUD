const connection = require('./connection')

const getAllActors = async () => {
    const [query] = await connection.execute('SELECT * FROM sakila.actor')
    return query
}

const getActorsById = async (id) => {
    const [query] = await connection.execute(`SELECT * from sakila.actor WHERE actor_id = ?`, [id])
    return query
}

const createActor = async (first_name, last_name) =>{
    const [query] = await connection.execute(`INSERT INTO sakila.actor (first_name, last_name) VALUES (?,?)`, [first_name,last_name])
    const item = await getActorsById(query.insertId)
    return item
}

const updateActor = async (id, first_name, last_name) =>{
    const item = await getActorsById(id)
    if(item.length === 0 ){
        return null 
    }
    const [query] = await connection.execute(`UPDATE sakila.actor 
    SET first_name = ?, last_name = ? WHERE actor_id = ?;`, [first_name, last_name, id])
    return query
}
const deleteActor = async (id) => {
    const item = await getActorsById(id)
    if(item.length === 0 ){
        return null
    }
    const [query] = await connection.execute(`DELETE FROM sakila.actor WHERE actor_id = ?;`, [id])
    
    return query
}

module.exports = { getAllActors, getActorsById, createActor, updateActor }