import React, { useEffect } from 'react';
import { message } from 'antd';
import { io } from "socket.io-client";


const useSocketManager = (user) => {

  useEffect(() => {

    const coopsolToken = localStorage.getItem("coopsolToken");
    if(!coopsolToken) return;

    const socket = io(process.env.REACT_APP_COOPSOL_BACKEND_URL, {
      auth:{
        token: coopsolToken
      }
    }); 

    socket.on("connect", () => {
      console.log(`Socket connected!`);
    });

    socket.on("connect_error", (err) => {
      console.log(`Error al conectar el socket:`,err)
    });

    socket.on("disconnect", (reason, details) => console.log(reason, details));


    socket.on("producer-did-associated", payload => {
      const { firstname, lastname, did } = payload;
      message.success(`Se ha asociado el did ${did} al productor ${firstname} ${lastname}`);
    })


    return () => {
      //cleanup
      socket.disconnect();
    }


  },[user]) 

  return null;
}

export default useSocketManager;