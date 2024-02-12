// import axios from 'axios';

const axios = require('axios')

const test2 = () => {
  axios.get('http://sw.unifresh.com.au:3777/OrderDateCheck.php?uName=Dominos Munno Para', { timeout: 50000 }).then((res) => {
    console.log(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// const test = () => {
// axios
//       .get(`http://localhost:5000/Users/User/OrderItem/Hungry Jacks Aberfoyle Park`, {timeout: 5000})
//       .then((res) => {
//         // setOrderItems(res.data)
        
//         if (res.data) {
//           axios
//           .get(`http://localhost:5000/Users/User/OrderDateCheck/Hungry Jacks Aberfoyle Park`, {timeout: 5000})
//           .then((res) => {
//             if(res.data){
//               axios
//               .get(`http://localhost:5000/Users/User/OrderScheduleCheck/Hungry Jacks Aberfoyle Park`, {timeout: 5000})
//               .then((res) => {
//                 // setOrderDate(res.data)
                
//               }
//               ).catch((err) => (console.log(err)));
//             }
//           }
//           ).catch((err) => (console.log(err))); 
//         }
//       }
//       ).catch((err) => (console.log(err)));
//     }
    
    let num = 0;
    setInterval(() => {
      test2()
      num++
      console.log(`Test Run ${num}`)
    }, 1000);