const wifi = require('node-wifi');

module.exports = Local_Middleware = function (req, res, next) {
  wifi.init({
    iface: null 
  });
  wifi.getCurrentConnections((error, currentConnections) => {
    if (error) {
      console.log(error);
    } else {
      console.log(currentConnections)
      if(currentConnections.length == 0){
         console.log('Please Connect To WIFI') 
         return
        }else if(!currentConnections[0].ssid == 'connected' && !currentConnections[0].bssid == 'UF'){
          console.log('Please Connect To UF Wifi')
          return
        } else {
        }
        next()
    }
  });
}