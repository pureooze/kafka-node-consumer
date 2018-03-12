// content of index.js
const http = require("http");
const Kafka = require("node-rdkafka");
const port = 3000;
//http://ec2-18-188-76-12.us-east-2.compute.amazonaws.com/

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

    // Consume from the librdtesting-01 topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume();
  })
  .on("data", function(data) {
    // Output the actual message contents
    console.log(data.value.toString());
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
