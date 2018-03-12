// content of index.js
const http = require("http");
const Kafka = require("node-rdkafka");
const WebSocket = require("ws");
const port = 3000;
//http://ec2-18-188-76-12.us-east-2.compute.amazonaws.com/

const ws = new WebSocket("ws://localhost:3001");

var consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list":
      "ec2-18-188-76-12.us-east-2.compute.amazonaws.com:9092"
  },
  {}
);

// Flowing mode
consumer.connect();

consumer
  .on("ready", function() {
    consumer.subscribe(["SimpleProducerTopic"]);

    consumer.consume();
  })
  .on("data", function(data) {
    // Output the actual message contents
    console.log(data.value.toString());
    ws.send(data.value);
  });

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end("Hello Node.js Server!");
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
