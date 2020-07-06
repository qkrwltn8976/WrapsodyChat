#!/usr/bin/env node
let amqp = require('amqplib/callback_api');

amqp.send = function () {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'hello';
            var msg = 'Hello World!';
            var msg2 = 'Hello World!ㅁㄴㅇㄹ';
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            channel.sendToQueue(queue, Buffer.from(msg2));
            console.log(" [x] Sent %s", msg);
            console.log(" [x] Sent %s", msg2);
        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    });
}

export default ampq;

