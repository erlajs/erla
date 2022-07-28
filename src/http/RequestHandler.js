import https from 'https'

import { IDENTIFICATION, VERSION, REPOSITORY } from '../util/Constants.js'

export default class RequestHandler {
  #url = `https://discord.com/api/v${VERSION}`
  #token

  constructor (token) {
    this.#token = token
  }

  request (path, method, body) {
    return new Promise((resolve, reject) => {
      const url = new URL(this.#url + path)

      const req = https.request({
        host: url.host,
        path: url.pathname,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${this.#token.replace(/Bot\s?/, '')}`,
          'User-Agent': `${IDENTIFICATION} (${REPOSITORY} ${VERSION})`
        }
      }, async message => {
        message.on('error', reject)

        const buffers = []

        for await (const chunk of message) {
          buffers.push(chunk)
        }

        const data = Buffer.concat(buffers).toString('utf-8')

        if (data) {
          resolve(JSON.parse(data))
        } else {
          resolve({
            statusCode: message.statusCode,
            message: message.statusMessage
          })
        }
      })

      if (body) {
        const data = typeof body === 'string'
          ? body
          : JSON.stringify(body)

        req.setHeader('Content-Length', data.length)
        req.write(data)
      }

      req.end()
    })
  }

  get (path) {
    return this.request(path, 'GET')
  }

  post (path, body) {
    return this.request(path, 'POST', body)
  }

  patch (path, body) {
    return this.request(path, 'PATCH', body)
  }

  put (path, body) {
    return this.request(path, 'PUT', body)
  }

  delete (path, body) {
    return this.request(path, 'DELETE', body)
  }
}
