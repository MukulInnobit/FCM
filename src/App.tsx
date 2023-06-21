import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { onMessageListener } from "./firebaseInit";
import Notifications from "./notifications";
import { ReactNotificationComponent } from "./reactNotificationComp";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  onMessageListener()
    .then((payload:any) => {
      console.log(payload,"payl")
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <Notifications/>
      <ReactNotificationComponent title={notification.title} body={notification.body}/>
    </div>
  );
}

export default App;
