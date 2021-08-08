const { OP } = require("../util/Constants");
const Ws = require("ws");
const fs = require("fs");

class WebSocket {
  #ws;
  #interval;
  #heartbeat;

  constructor(client) {
    this.client = client;

    this.gateway = "wss://gateway.discord.gg/?v=9&encoding=json";
    this.#ws;
    this.#interval;
    this.ping;
    this.#heartbeat;
  }

  async connect() {
    this.#ws = new Ws(this.gateway);

    this.#ws.on("open", () => this.identify());

    this.#ws.on("message", packet => {
      const payload = JSON.parse(packet.toString());
      const {
        t,
        s,
        op,
        d
      } = payload;

      switch (op) {
        case OP.DISPATCH:
          const event = `${process.cwd()}/lib/events/${t}.js`;

          if (fs.existsSync(event)) {
            require(event).emit(payload, this.client);
          }

          return;

        case OP.HELLO:
          this.#interval = d.heartbeat_interval;
          return this.heartbeat(s);

        case OP.HEARTBEAT_ACK:
          this.ping = Date.now() - this.#heartbeat;
          return this.#heartbeat = false;
      }
    })
  }

  heartbeat(s = null) {
    this.#ws.send(JSON.stringify({
      op: OP.HEARTBEAT,
      d: null
    }));

    this.#heartbeat = Date.now();

    setTimeout(() => {
      this.heartbeat();
      console.log(this.ping)
    }, this.#interval)
  }

  async identify() {
    const id = {
      op: OP.IDENTIFY,
      d: {
        token: this.client.token,
        intents: this.client.intents,
        properties: {
          $os: process.platform.toString(),
          $browser: "erla",
          $device: "erla"
        },
      }
    };

    return this.#ws.send(JSON.stringify(id));
  }
}

module.exports = WebSocket;