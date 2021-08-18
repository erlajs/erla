const https = require('https')

function makeRequest (options) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, req => {
      req.setEncoding('utf-8')

      let data = ''

      req.on('data', chunk => {
        data += chunk
      })
      req.on('end', () => resolve(JSON.parse(data)))
      req.on('error', reject)
    })

    if (options.body) {
      const body = JSON.stringify(options.body)

      request.setHeader('Content-Length', body.length)
      request.write(body)
    }

    request.end()
  })
}

module.exports = { makeRequest }
