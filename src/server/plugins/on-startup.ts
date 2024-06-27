export default defineNitroPlugin(async () => {
  runTask('seed-database');
})