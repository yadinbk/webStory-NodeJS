const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: (str, length) =>
        str.slice(0, str.slice(0, length).lastIndexOf(' ')) + (str.length > length ? "..." : '')
    ,
    stripTag: (str) =>
        str.replace(/<(?:.|\n)*?>/gm, '')
    ,
    editIcon: (storyUser, loggedUser, storyId, floating = true) =>
        (storyUser._id.toString() == loggedUser._id.toString()) ?
            true : false
}
