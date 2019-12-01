var databases = []
databases.push('mysql://root:sml12345@localhost:3306/m141')
databases.push('mysql://root:sml12345@localhost:3306/m141b')
databases.push('postgres://postgres:sml12345@localhost:5432/m141')
// select database here: 0..2
var db = 2
const DATABASE_URL = databases[db]
const databaseUrl = process.env.DATABASE_URL || DATABASE_URL  // take DATABASE_URL via environment variable if available (e.g. at heroku)
const client = databaseUrl.split(':')[0]
const conf = {client: client, connection: databaseUrl}

module.exports = conf