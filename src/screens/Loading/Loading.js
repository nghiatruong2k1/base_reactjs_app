import { memo } from 'react';
import clsx from 'clsx';
import { Button, CircularProgress } from '@mui/material';
import styles from './Loading.module.css';
import { useSelectorGlobal } from '~/states';
import { isLoadingSelector } from '~/hooks/useLoading/selectors';
function TitleComponent() {
  const isLoading = useSelectorGlobal((state) =>
    isLoadingSelector(state.loading),
  );
  if (isLoading) {
    return (
      <div className={clsx(styles.root)}>
        <Button variant="outlined" color="info" className={styles.button}>
          <CircularProgress color="info" className={styles.svg} />
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
}
export default memo(TitleComponent);
