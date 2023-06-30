const express = require("express");
const initializeFirebaseSDK = require("./startup/firebase");
const clientRouter = require("./routes/client");
const error = require("./middlewares/error");
const app = express();
var FCM = require('fcm-node');
const push_package = require("./helpers/push_package");
var serverKey = 'AAAAS_LX6qw:APA91bGjKCfUutoWjpgaXsFv-w20kYnV77JkSGMVTiQez0SRcLx35W7i55kpMaAEfrJupPASk1zIrbxKeIYPo53W6z8WEdDFW_q7UtBeUfkIge5aJkUa86uNu7bh6prpZP0F5qnGyXji'; //put your server key here
var fcm = new FCM(serverKey);
//Startups
// require("./startup/logging")();
// require("./startup/db")();
const regTokem = initializeFirebaseSDK();
// console.log(regTokem)

//Api Routes
app.use("/api/client", clientRouter);

app.use(error);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>{
  push_package(app);
  console.log(`Listening on port ${port}...`)
}
);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to: "dLvqbjr57T67aN5MkY0-48:APA91bFOrZBvHVIB2x_nyEneMWnARaaXwiwoTotfrhdqUwNbwVBQeJB_z2cvRgHxUCQLmiNGMZbVIWadki-AnrvM4CNAreU7RAi0w849yVwzBqZY4Yeqo5I4JsBBTC2iC--gqHKMVhQV", 
  collapse_key: 'green',
  
  notification: {
      title: 'Title of your push notification', 
      body: 'Body of your push notification' 
  },
  
  data: {  //you can send only notification or only data(or include both)
      my_key: 'my value',
      my_another_key: 'my another value'
  }
};

fcm.send(message, function(err, response){
  if (err) {
      console.log("Something has gone wrong!");
  } else {
      console.log("Successfully sent with response: ", response);
  }
});
