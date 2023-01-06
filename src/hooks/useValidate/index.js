import { useCallback, useState } from 'react';

export default function useValidate(Entity) {
  const [state, setState] = useState(
    Object.keys(Entity).reduce((rs, key) => {
      if (Entity[key].validate) {
        rs[key] = '';
      }
      return rs;
    }, {}),
  );
  const check = useCallback((props) => {
    console.log(props)
    return Object.keys(Entity).reduce((rs, key) => {
      let error = 0;
      if (Entity[key].validate) {
        error = Entity[key].validate(props[key], props, (valids) => {
          setState(({...prevState}) => {
            prevState[key] = valids[0] ?? '';
            return prevState;
          });
        });
      }
      return rs + error;
    }, 0);
  }, []);
  return [state, check];
}
