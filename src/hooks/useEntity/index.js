import { useMemo, useRef, useState } from 'react';

export default function useEntity(Entity) {
  const [state, setState] = useState(new Entity());
  const handle = useMemo(() => {
    const _this = {};
    Object.keys(Entity).forEach((key) => {
      Object.defineProperty(_this, `set${key}`, {
        enumerable: false,
        value: function (value) {
          setState((prevState) => {
            const newState = new Entity(prevState);
            newState[`set${key}`](value);
            return newState;
          });
        },
      });
    });
    Object.defineProperty(_this, 'merge', {
      enumerable: false,
      value: function (entity) {
        setState((prevState) => {
          const newState = new Entity(prevState);
          newState[`merge`](entity);
          return newState;
        });
      },
    });
    return _this;
  }, []);
  const value = useMemo(() => {
    return state.getValues();
  }, [state]);
  return [value, handle];
}

/**
 *
 */
