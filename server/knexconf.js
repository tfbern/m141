//const DATABASE_URL = 'postgres://postgres:sml12345@localhost:5432/m141'
const DATABASE_URL = 'mysql://root:sml12345@localhost:3306/m141'
const databaseUrl = process.env.DATABASE_URL || DATABASE_URL  // take DATABASE_URL via environment variable if available (e.g. at heroku)
const client = databaseUrl.split(':')[0]
const conf = {client: client, connection: databaseUrl}

module.exports = conf