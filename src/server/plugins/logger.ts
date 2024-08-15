import consola from 'consola'

function getDynamicTag(){
  const timestamp = new Date().toISOString() // Get the current timestamp
    
     // Construct the log message
    return  `vidur [${timestamp}]`

}
// Create and configure the logger
const logger = consola.create({
  level: process.env.NODE_ENV === 'production' ? 4 : 3 // Set log level based on environment
}).withTag(getDynamicTag())


export default defineNitroPlugin((nitroApp) => {
  nitroApp.logger = logger
})