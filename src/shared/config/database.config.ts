export const MongoConfig = {
    MONGO_USER: process.env.MONGO_USER || 'defaultUser',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'defaultPass',
    MONGO_CLUSTER: process.env.MONGO_CLUSTER || 'cluster0',
    DB_NAME: process.env.DB_NAME || 'urlshortener',
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  };