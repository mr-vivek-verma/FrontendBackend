//const sportsAndActivities = require('./sportsAndActivities.seeder')
const importAdmin = require('./admin.seeder')
//const { importAmbassadors, importUniversities}=require('./ambassador&University.seeder')

async function seeder() {
  // await sportsAndActivities()
  await importAdmin()
  // await importUniversities()
  // await importAmbassadors()
}

seeder()

module.exports = seeder
