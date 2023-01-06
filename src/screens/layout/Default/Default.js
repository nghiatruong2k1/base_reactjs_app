import { memo, Fragment } from 'react';
import clsx from 'clsx';
function DefaultLayoutComponent({ children }) {
  return <Fragment>{children}</Fragment>;
}
export default memo(DefaultLayoutComponent);
