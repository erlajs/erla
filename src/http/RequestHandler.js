import https from 'https'

import { IDENTIFICATION, VERSION, REPOSITORY } from '../util/Constants.js'

export default class RequestHandler {
  #url = `https://discord.com/api/v${VERSION}`
  #token

  constructor (token) {
    this.#token = token
  }

  request (path, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(this.#url + path)

      const req = https.request({
        host: url.host,
        path: url.pathname,
        method: options.method,
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

      if (options.body) {
        const body = typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body)

        req.setHeader('Content-Length', body.length)
        req.write(body)
      }

      req.end()
    })
  }
}
