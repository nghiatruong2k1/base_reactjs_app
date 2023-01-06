import { memo, useCallback, useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import CustomMessageContent from './MessageContent';
import styles from './Message.module.css';
function CustomMessageProvider({ children }) {
  const SnackRef = useRef();
  const renderContent = useCallback(
    (key, mes) => {
      return (
        <CustomMessageContent
          key={key}
          onClose={() => {
            SnackRef.current && SnackRef.current.closeSnackbar(key);
          }}
          {...mes}
        />
      );
    },
    [SnackRef.current],
  );
  return (
    <SnackbarProvider
      ref={SnackRef}
      maxSnack={3}
      className={styles.container}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      preventDuplicate
      autoHideDuration={10000}
      content={renderContent}
    >
      {children}
    </SnackbarProvider>
  );
}
export default memo(CustomMessageProvider);

/** */
