const faunadb = require('faunadb'),
  q = faunadb.query;
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
    try {  
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

        const result = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("all_todos"))),
              q.Lambda(x => q.Get(x))
            )
          )

        return{
            statusCode: 200,
            body: JSON.stringify(result.data)
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}