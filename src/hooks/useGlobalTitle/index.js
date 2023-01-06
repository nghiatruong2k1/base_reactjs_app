import { useCallback } from 'react';
import { useDispatchGlobal } from '~/states';
import { sliceReducerTitle } from '~/hooks/useTitle/reducer';
export default function useGlobalTitle( params = []) {
  const dispath = useDispatchGlobal();
  return useCallback((title) => {
    if (typeof title === 'string') {
        dispath(sliceReducerTitle.actions.addTitle(title));
      return () => {
        dispath(sliceReducerTitle.actions.removeTitle());
      };
    }else{
      return ()=>{};
    }
  }, params);
}
