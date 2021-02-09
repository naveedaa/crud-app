const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method is not Allowed" }
    }

    const { todo } = JSON.parse(event.body)
    try {  
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
        const result = await client.query(
            q.Create(q.Collection("todos"), {
                data : {
                    todo
                }
            })
        );

        return {
            statusCode: 200,
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}