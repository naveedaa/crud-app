/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb')

const client = new Client({
  secret: "fnAD-HKcdVACB2yQznHNqkHJYv4kgI64DwqAhu9a",
})

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'delete' invoked. delete id: ${id}`)
  return client
    .query(query.Delete(query.Ref(query.Collection('todos'),id)))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }