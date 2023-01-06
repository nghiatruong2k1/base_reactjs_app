import { memo, Fragment } from 'react';
import { useEffect } from 'react';
import { currentTitleSelector } from '~/hooks/useTitle/selectors';
import { useSelectorGlobal } from '~/states';
function TitleComponent() {
  const title = useSelectorGlobal((state) =>
    currentTitleSelector(state.titles),
  );
  useEffect(() => {
    document.title = `${
      (title !== '' ? title + ' | ' : '') + process.env.REACT_APP_WEBSITE_NAME
    }`;
  }, [title]);
  return <Fragment></Fragment>;
}
export default memo(TitleComponent);
