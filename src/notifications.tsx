import { useState, useEffect } from "react";
import { getTokenFcm } from "./firebaseInit";

const Notifications = (props:any) => {
    const [isTokenFound, setTokenFound] = useState(false);                
    console.log("Token found", isTokenFound);
    useEffect(() => {
      let data;
      async function tokenFunc() {
        data = await getTokenFcm(setTokenFound);
        if (data) {
          console.log("Token is", data);
        }
        return data;
      }
      tokenFunc();
    }, [setTokenFound]);
    return <></>;
   };
  export default Notifications;