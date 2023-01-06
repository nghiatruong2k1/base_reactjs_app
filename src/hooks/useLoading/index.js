import { useCallback, useMemo, useReducer } from 'react';
import { actionToggleLoading } from './actions';
import { initStateLoading, reducerStateLoading } from './reducer';
import { isLoadingSelector } from './selectors';

export default function useLoading(initLoading) {
  const [loading, dispathLoading] = useReducer(
    reducerStateLoading,
    initLoading ? 1 : initStateLoading,
  );
  const isLoading = useMemo(() => {
    return isLoadingSelector(loading);
  }, [loading]);
  const handleLoading = useCallback(() => {
    dispathLoading(actionToggleLoading(!initLoading));
    return () => {
      actionToggleLoading(initLoading);
    };
  }, []);
  return [isLoading, handleLoading];
}
