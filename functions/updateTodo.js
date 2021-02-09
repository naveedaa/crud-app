const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
    if (event.httpMethod !== "PUT") {
        return { statusCode: 405, body: "Method is not Allowed" }
    }

    const {todo, id } = JSON.parse(event.body)
    try {  
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
        const result = await client.query(
            q.Update(q.Ref(q.Collection('todos'), id), {
                data: {
                    todo
                }
            })
        );

        return {
            statusCode: 200
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}