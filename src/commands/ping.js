/* Export our launch() function */
module.exports.launch = (client, config, message, args) => {
  message.channel.send("Pinging...").then(sent => {
    sent.edit({
      embed: {
        color: 0x2ecc71,
        title: "🏓 Pong!",
        description: "Took: " + (sent.createdTimestamp - message.createdTimestamp) + " MS"
      }
    })
  })
}
/* Export our getSyntax() function */
module.exports.getSyntax = () => {
  return "ping"
}
/* Export our getDescription() function */
module.exports.getDescription = () => {
  return "Check your latency."
}