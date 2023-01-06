import { ActionConfig, ControllerConfig, RouterConfig } from '~/config/Router';
import { DefaultLayout } from '~/screens/layout';
import { HomePage, NotFoundPage } from '~/screens/page';

const publicControllers = new ControllerConfig(
  '',
  {
    home: new ActionConfig('Trang chủ', '', HomePage),
    notfound: new ActionConfig('Not Found', '*', NotFoundPage),
  },
  { layout: DefaultLayout },
);

export const routers = new RouterConfig({
  publicControllers,
});
