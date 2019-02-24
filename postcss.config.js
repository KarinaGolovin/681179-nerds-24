module.exports = function (ctx) {
  return {
    map: ctx.options.map,
    plugins: [
      require('cssnano')({
        preset: 'default',
      }),
      require('autoprefixer')
    ]
  };
}
