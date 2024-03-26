const md5 = require('md5')
const cryptoJs = require('crypto-js')
const cryptoKey = 'my-secret-key'

const appId = 'api::student.student'
module.exports = {
    async beforeCreate(event) {
        // console.log('beforeCreate is worked...', event.params.data)
        // event.params.data.Tel = 'demo-hook'
        // event.params.data.Tel = md5(event.params.data.Tel)
        const Tel = event.params.data.Tel
        // const makeEncrypt = cryptoJs.AES.encrypt(Tel, cryptoKey).toString()
        
        event.params.data.Tel = await strapi.service(appId).encrypt(Tel)
    },
    async afterFindOne(event) {
        // console.log('afterFindOne ', event.result.Tel)

        const Tel = event.result.Tel
        // const makeDecrypt = cryptoJs.AES.decrypt(Tel, cryptoKey)
        // const makeToString = makeDecrypt.toString(cryptoJs.enc.Utf8)
        event.result.Tel = await strapi.service(appId).decrypt(Tel)
    },
    async afterFindMany(event) {
        console.log('afterFindMany ', event.result)
        event?.result?.map(async result => {
            console.log('result ', result)
            result.Tel = await strapi.service(appId).decrypt(result.Tel)
            return result 
        })
    }
}