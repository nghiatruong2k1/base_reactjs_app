import { Ruler } from "./Rulers";

export function Validate(callback){
  const rulers = new Ruler();
  callback(rulers);
  return function(value,values,callback){
    const valids = rulers.reduce((rs,ruler)=>{
      const mes = ruler(value, values);
      if (mes != '') {
        rs.push(mes);
      }
      return rs;
    },[])
    const error = (callback && callback(valids)) || valids.length;
    return error;
  }
}


// Validate.checkValue = (value, rulers, values, callback) => {
//   const valids = Object.keys(rulers).reduce(function (mess, ruler) {
//     if (Validate.rulers.hasOwnProperty(ruler)) {
//       const mes = Validate.rulers[ruler](value, rulers[ruler], values);
//       if (mes != '') {
//         mess.push(mes);
//       }
//     } else {
//       mess.push('Không tồn tại ràng buộc dữ liệu ' + ruler);
//     }
//     return mess;
//   }, []);
//   const error = (callback && callback(valids)) || valids.length;
//   return error;
// };
// Validate.checkObject = (values, rulerValues, callback) => {
//   if (typeof rulerValues === 'object' && typeof values === 'object') {
//     return Object.keys(rulerValues).reduce(function (result, key) {
//       const valids = Validate.checkValue(
//         values[key],
//         rulerValues[key],
//         values,
//         function (valids) {
//           return callback && callback(key, valids);
//         },
//       );
//       return result + valids;
//     }, 0);
//   }
//   return 0;
// };
