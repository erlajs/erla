const { default: axios } = require("axios");
const { version } = require(`${process.cwd()}/package.json`);

class APIRequest {
  #api
  #options

  constructor(token) {
    this.#api = "https://discord.com/api/v9";
    this.#options = {
      headers: {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json",
        "User-Agent": `erla (https://github.com/erla-js/erla, ${version})`
      }
    };
  }

  async post(endpoint, data) {
    const res = await axios.post(this.#api + endpoint, data, this.#options);

    return res.data;
  }

  async get(endpoint) {
    const res = await axios.get(this.#api + endpoint, this.#options);

    return res.data;
  }
}

module.exports = APIRequest;