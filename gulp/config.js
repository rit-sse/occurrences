module.exports = {
  build: {
    css: './dist/css',
    js: './dist/js',
    jsMain: './dist/js/main.js',
    all: './dist'
  },

  source: {
    stylesheets: './app/less/**.less',
    jsMain: './app/js/app.jsx',
    scripts: './app/js/**/*.@(js|jsx)',
    html: './app/index.html'
  }
};
