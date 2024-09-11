const Prodcution = 'http://10.0.0.52:5000';
const Development = 'http://localhost:5000';
// const date = new Date();

const Freeze = false;
let URL_ = '';

let OnOff = false;
if (OnOff === false) {
    URL_ = Development;
}else {
    URL_ = Prodcution
}

if(Freeze === true){
    URL_ = 'http://10.0.0.116:5000/xyz'
}

export const URL = URL_;