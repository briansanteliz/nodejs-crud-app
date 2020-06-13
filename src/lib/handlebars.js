const timeago = require('timeago.js')
const time = timeago()
const helpers = {}
helpers.time = (timestamp)=>{
    return time.format(timestamp)
}
module.exports = helpers