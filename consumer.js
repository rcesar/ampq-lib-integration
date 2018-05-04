const amqp = require('amqplib/callback_api')
const DOMAIN = 'TESTE_TESTE'
const ex = 'TESTE_EX'

amqp.connect('amqp://localhost', function (err, conn) {
  if (err) {
    console.log(err)
  }
  conn.createChannel(function (err, ch) {
    if (err) {
      console.log(err)
    }

    ch.assertExchange(ex, 'topic', { durable: false })

    ch.assertQueue(DOMAIN, { exclusive: false, durable: true, persist: true }, function (err, q) {
      if (err) {
        console.log(err)
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C')

      ch.bindQueue(q.queue, ex, DOMAIN)

      ch.consume(q.queue, function (msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString())
      }, { noAck: true })
    })
  })
})
