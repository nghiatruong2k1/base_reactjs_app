import { NewObject } from './index';
export class Entity extends NewObject {
  constructor(props = {}, entity = Entity) {
    super();
    const _this = this;
    Object.keys(entity).forEach((key) => {
      Object.defineProperty(_this, `set${key}`, {
        enumerable: false,
        value: function (value) {
          _this[key] =
            (entity[key].setter &&
              entity[key].setter(value ?? entity[key].defaultValue)) ??
            value;
        },
      });
      Object.defineProperty(_this, `get${key}`, {
        enumerable: false,
        value: function () {
          return (
            (entity[key].getter &&
              entity[key].getter(_this[key] ?? entity[key].defaultValue)) ??
            _this[key] ??
            entity[key].defaultValue ??
            ''
          );
        },
      });
      _this[`set${key}`](props[key] ?? entity[key].defaultValue);
    });
    Object.defineProperty(_this, 'merge', {
      enumerable: false,
      value: function (entity) {
        Object.keys(_this).forEach((key) => {
          _this[`set${key}`](entity[key]);
        });
      },
    });
    Object.defineProperty(_this, 'getValues', {
      enumerable: false,
      value: function () {
        return Object.keys(_this).reduce((rs, key) => {
          rs[key] = _this[`get${key}`]();
          return rs;
        }, {});
      },
    });
  }
}
