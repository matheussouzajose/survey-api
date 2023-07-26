export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://root:example@localhost:27017/',
  port: process.env.MONGO_URL ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'msj==10Oc'
}
