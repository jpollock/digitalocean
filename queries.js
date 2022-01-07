const fs = require('fs');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'doadmin',
  host: 'db-postgresql-nyc1-33441-do-user-10531769-0.b.db.ondigitalocean.com',
  database: 'defaultdb',
  password: '1xHb7dN9hdLaJ0VT',
  port: 25060,
  ssl:  {
    rejectUnauthorized : false,
    cert : fs.readFileSync("ca-certificate_prod.crt").toString(),
}})

const getCounterById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM counters WHERE id = $1', [id], (error, results) => {
      console.log(error);
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const incrementCounter = (request, response) => {
    const id = parseInt(request.params.id)
    let value = 1
    
    pool.query('SELECT * FROM counters WHERE id = $1', [id], (error, results) => {
        
        if (error) {
          throw error
        }
        if (results.rows.length === 0) {
            console.log(value);
            pool.query('INSERT INTO counters (id, value) VALUES ($1, $2)', [id, value], (error, results) => {
                if (error) {
                throw error
                }
                response.status(201).send(`{}`)
            })
        } else {
            console.log(results.rows[0].value);
            value = results.rows[0].value + 1;
            pool.query('UPDATE counters SET value = $2 WHERE id = $1', [id, value], (error, results) => {
                if (error) {
                throw error
                }
                //response.status(201).send(`{}`)
            })

        }
        response.status(201).send(`{}`)
        //response.status(200).json(results.rows)
      })
  
    /*
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })*/
}

const decrementCounter = (request, response) => {
    const id = parseInt(request.params.id)
    let value = 1
    
    pool.query('SELECT * FROM counters WHERE id = $1', [id], (error, results) => {
        
        if (error) {
          throw error
        }
        if (results.rows.length === 0) {
            console.log(value);
            pool.query('INSERT INTO counters (id, value) VALUES ($1, $2)', [id, value], (error, results) => {
                if (error) {
                throw error
                }
                response.status(201).send(`{}`)
            })
        } else {
            console.log(results.rows[0].value);
            value = results.rows[0].value - 1;
            pool.query('UPDATE counters SET value = $2 WHERE id = $1', [id, value], (error, results) => {
                if (error) {
                throw error
                }
                //response.status(201).send(`{}`)
            })

        }
        response.status(201).send(`{}`)
        //response.status(200).json(results.rows)
      })
  
    /*
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })*/
}

module.exports = {
    getCounterById,
    incrementCounter,
    decrementCounter
}