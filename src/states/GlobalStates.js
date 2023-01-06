import { memo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { GlobalContext } from './init';
import { configureStore } from '@reduxjs/toolkit';
import { sliceReducerTitle } from '~/hooks/useTitle/reducer';
import { sliceReducerLoading } from '~/hooks/useLoading/reducer';
const GlobalStates = configureStore({
  reducer: {
    titles: sliceReducerTitle.reducer,
    loading: sliceReducerLoading.reducer,
  },
});

function GlobalStatesComponent({ children }) {
  return (
    <ReduxProvider context={GlobalContext} store={GlobalStates}>
      {children}
    </ReduxProvider>
  );
}
export default memo(GlobalStatesComponent);
