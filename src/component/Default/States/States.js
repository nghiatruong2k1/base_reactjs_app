import { memo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Context } from './init';
import { configureStore } from '@reduxjs/toolkit';
const States = configureStore({
  reducer: {},
});

function Provider({ children }) {
  return (
    <ReduxProvider context={Context} store={States}>
      {children}
    </ReduxProvider>
  );
}
export default memo(Provider);