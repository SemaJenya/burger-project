
// ф-я созания мидлвара
export const socketMiddleware = (wsActions) => {   //урл будем передавать в экшене для того, чтобы переиспользовать мидлвар
  return store => {   //сам мидлвар в качестве параметра принимает стор и имеет к нему доступ
    let socket = null;
    let wsUrl = '';
    let reconnectTimer = 0;
    let isConnected = false;
    let countConnecting = 0;
    const MAX_RECONNECTING = 5;

    return next => action => {    //это экшен
      const { dispatch } = store;  //в сторе есть методы диспатч и гет стейт и мы можем их оттуда доставать
      const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage, wsSend } = wsActions;


      if (wsConnect.match(action)) {
        wsUrl = action.payload;
        socket = new WebSocket(`${wsUrl}`);
        isConnected = true;
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsOpen());
        };

        socket.onerror = event => {
          dispatch(wsError(event.code?.toString()));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };
        
        socket.onclose = event => {
          console.log('Im is on close');
          if (event.code !== 1000) {
            console.log('error close not 1000');
            dispatch(wsError(event.code?.toString()))
          }

          if (isConnected && event.code !== 1000) {
            console.log('повторное соединение');
            countConnecting++;
            if (countConnecting < MAX_RECONNECTING) {
              reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(`${wsUrl}`))
              }, 3000)
            }
          }

        };

        if (wsSend.match(action)) {
          // const message = '343434343';
          console.log(action.payload);
          // socket.send(JSON.stringify(message));
        }
      }
      
      


      if (wsDisconnect.match(action)) {
        console.log('closing');
        clearTimeout(reconnectTimer); //очищаем таймер, если попали в 3 сек
        isConnected = false;
        reconnectTimer = 0;
        socket.close(1000, 'Завершена работа')
        dispatch(wsClose());

      }

      next(action);
    };
  };
};