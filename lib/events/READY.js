const User = require("../structures/User");

function onReady(payload, client) {
  const { user } = payload.d;

  client.me = new User({
    username: user.username,
    discrim: user.discriminator,
    id:  user.id,
    verified: user.verified,
    email: user.email,
    bot: user.bot,
    flags: user.flags,
    avatar: user.avatar
  });

  client.emit("ready");
}

module.exports.emit = onReady;