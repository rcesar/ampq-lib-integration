const amqp = require('amqplib/callback_api')
let CH = null
const ex = 'TESTE_EX'

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) {
    return err
  }
  conn.createChannel((err, ch) => {
    if (err) {
      return err
    }
    CH = ch
    ch.assertExchange(ex, 'topic', { durable: false })
  })
})

const sendMsg = async (msg, domain) => {
  await CH.publish(ex, domain, Buffer.from(msg))
  console.log(" [x] Sent %s:'%s'", domain, msg)
}

module.exports = {sendMsg}
