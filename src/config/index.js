export class NewObject extends Object {
  constructor(props) {
    super(props);
    Object.defineProperty(this, 'map', {
      enumerable: false,
      value: function (callback) {
        return Object.keys(this).map((key) => {
          /** value:any,
           * key:string,
           * this:object
           * */
          return callback(this[key], key, this);
        });
      },
    });
    Object.defineProperty(this, 'forEach', {
      enumerable: false,
      value: function (callback) {
        return Object.keys(this).forEach((key) => {
          /** value:any,
           * key:string,
           * this:object
           * */
          callback(this[key], key, this);
        });
      },
    });
    Object.defineProperty(this, 'reduce', {
      enumerable: false,
      value: function (callback, result) {
        return Object.keys(this).reduce((rs,key) => {
          /** value:any,
           * key:string,
           * this:object
           * */
          return callback(rs, this[key], key, this);
        }, result);
      },
    });
  }
}
