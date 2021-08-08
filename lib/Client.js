const { EventEmitter } = require("events");

const Defaults = require("./util/Defaults");
const Intents = require("./Intents");
const APIRequest = require("./rest/APIRequest");
const WebSocket = require("./ws/WebSocket");

const User = require("./structures/User");

class Client extends EventEmitter {
  #apiRequest

  constructor(options) {
    super();

    this.token = options?.token;

    this.#apiRequest = new APIRequest(this.token);
    this.intents = Intents.resolve(options.intents ?? 513);
    this.me = Defaults.structures.me;
    this.ws;
    this.started;
  }

  #buildContent(content, options) {
    let data = options || {};

    if (typeof content == "string") {
      data["content"] = content;
    } else if (typeof content == "object") {
      return content;
    }

    return data;
  }

  async sendMessage(channelId, content, options) {
    const res = await this.#apiRequest.post(`/channels/${channelId}/messages`, this.#buildContent(content, options));

    return res;
  }

  async user(userId) {
    const res = await this.#apiRequest.get(`/users/${userId}`);

    return new User(res);
  }

  async connect() {
    if (!this.token) throw new Error("Invalid or undefined token");

    this.started = Date.now();
    this.ws = new WebSocket(this);

    this.ws.connect();
  }

  get uptime() {
    return Date.now() - this.started;
  }
}

module.exports = Client;