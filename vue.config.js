// vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "今日之星"
                return args
            })
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/animal-crossing-slot/'
    : '/'
}