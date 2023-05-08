
// ф-я созания мидлвара
export const socketMiddleware = (wsActions) => {   //урл будем передавать в экшене для того, чтобы переиспользовать мидлвар
    return store => {   //сам мидлвар в качестве параметра принимает стор и имеет к нему доступ
      let socket = null;
      let wsUrl = '';

      return next => action => {    //это экшен
        const { dispatch } = store;  //в сторе есть методы диспатч и гет стейт и мы можем их оттуда доставать
        const {  wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage, wsSend } = wsActions;
    
        if (wsConnect.match(action)) {
          wsUrl = action.payload;
          socket = new WebSocket(`${wsUrl}`);
          console.log(socket);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch(wsOpen());
          };
  
          socket.onerror = event => {
            dispatch(wsError(event.code.toString()));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);

  
            dispatch(wsMessage(parsedData));
          };
  
          socket.onclose = event => {
            dispatch(wsClose);
          };
  
          // if (type === wsSend) {
          //   const message = { ...payload};
          //   socket.send(JSON.stringify(message));
          // }
        }

        if (wsDisconnect.match(action)) {
          socket.close(1000, 'Завершена работа')
        }
  
        next(action);
      };
    };
  };