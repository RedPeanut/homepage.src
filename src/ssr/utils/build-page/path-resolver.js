const slash = require('slash');
const parsePath = require('parse-filepath');
const urlResolver = require('./url-resolver');

module.exports = function pathResolver(relativePath, pageData) {
  const data = {}

  data.file = parsePath(relativePath)

  // Remove the . from extname (.md -> md)
  data.file.ext = data.file.extname.slice(1)
  // Make sure slashes on parsed.dirname are correct for Windows
  data.file.dirname = slash(data.file.dirname)

  // Determine require path
  data.requirePath = slash(relativePath)

  // set the URL path (should this be renamed)
  // and now looking at it, it only needs a reference to pageData
  data.path = urlResolver(pageData, data.file)

  // Set the "template path"
  if (data.file.name === '_template') {
    data.templatePath = `/${data.file.dirname}/`
  }

  // Remove the absolute path and isAbsolute bool
  delete data.file.absolute
  delete data.file.isAbsolute

  return data
}
