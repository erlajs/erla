import https from "https"

import Constants from "../util/Constants.js"

export default class RequestHandler {
  constructor(token) {
    this._token = token
    this._baseUrl = `https://discord.com/api/v${Constants.VERSION}`
  }

  request(path, options = {}) {
    options.headers ??= Constants.DEFAULT_HEADERS(this._token)

    return this._do(this._baseUrl + path, options)
  }

  _do(url, options) {
    return new Promise((resolve, reject) => {
      url = new URL(url)

      const req = https.request({
        host: url.host,
        path: url.pathname,
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      }, message => {
        message.setEncoding("utf-8")

        let data = ""

        message.on("data", chunk => data += chunk)

        message.on("end", () => resolve(
          JSON.parse(data)
        ))

        message.on("error", reject)
      })

      if (options.body) {
        const body = typeof options.body == "string" ?
          options.body :
          JSON.stringify(options.body)

        req.setHeader("Content-Length", body.length)
        req.write(body)
      }

      req.end()
    })
  }
}