module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB_URI || 'mongodb+srv://jsvale-guerrero:mierda358@progra-iii-cwrlz.mongodb.net/proyecto?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokens'
}