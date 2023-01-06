import './App.css';
import Title from '~/screens/Title';
import Loading from '~/screens/Loading';
import { routers } from '~/routers';
import { Fragment, memo, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ControllerConfig } from './config/Router';
import useGlobalTitle from './hooks/useGlobalTitle';
const Element = memo(({ title, page, layout }) => {
  const Layout = layout === null ? Fragment : layout ?? Fragment;
  const Page = page ?? Fragment;
  const handleGlobalTitle = useGlobalTitle();
  useEffect(() => {
    return handleGlobalTitle(title);
  }, []);
  return (
    <Layout>
      <Page title={title} />
    </Layout>
  );
});
const bodyRoot = document.getElementById('root');
function App() {
  const location = useLocation();
  useEffect(() => {
    bodyRoot.scrollTop = 0;
  }, [location]);
  useEffect(() => {
    console.log([routers, process.env]);
  }, []);
  return (
    <>
      <Title />
      <Loading />
      <Routes>
        {routers.map((route, key) => {
          if (route instanceof ControllerConfig) {
            const Page = route.checkpage ?? Outlet;
            return (
              <Route key={key} path={route.path} element={<Page />}>
                {route.map((action, keyaction) => {
                  return (
                    <Route
                      key={keyaction}
                      path={action.valueOf()}
                      element={
                        <Element
                          title={action.title}
                          layout={action.layout}
                          page={action.page}
                        />
                      }
                    />
                  );
                })}
              </Route>
            );
          } else {
            return (
              <Route
                key={key}
                path={route.valueOf()}
                element={
                  <Element
                    title={route.title}
                    layout={route.layout}
                    page={route.page}
                  />
                }
              />
            );
          }
        })}
      </Routes>
    </>
  );
}

export default memo(App);
