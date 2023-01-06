import { useCallback, useMemo, useReducer } from 'react';
import { actionAddTitle, actionRemoveTitle } from './actions';
import { initStateTitle, sliceReducerTitle } from './reducer';
import { currentTitleSelector } from './selectors';
export default function useTitle() {
  const [titles, dispathTitle] = useReducer(sliceReducerTitle, initStateTitle);
  const title = useMemo(() => {
    return currentTitleSelector(titles);
  }, [titles]);

  const handleTitle = useCallback((title) => {
    if (typeof title === 'string') {
      dispathTitle(actionAddTitle(title));
      return () => {
        dispathTitle(actionRemoveTitle());
      };
    }
  }, []);
  return [title, handleTitle];
}
