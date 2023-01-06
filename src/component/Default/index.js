import { memo} from 'react';
import DefaultComponent from './Default';
import StatesProvider from './States';
function Default() {
  return (
    <StatesProvider>
      <DefaultComponent />
    </StatesProvider>
  );
}
export default memo(Default);
