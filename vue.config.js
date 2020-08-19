module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'University Challenge Scores'
      return args
    })
  }
}
