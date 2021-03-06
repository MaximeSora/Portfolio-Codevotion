import { lazy, Suspense, useEffect, createContext, useReducer, Fragment } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import ThemeProvider from 'components/ThemeProvider';
import CustomCursor from 'components/CustomCursor';
import VisuallyHidden from 'components/VisuallyHidden';
import { tokens } from 'components/ThemeProvider/theme';
import { msToNum } from 'utils/style';
import { useLocalStorage } from 'hooks';
import { initialState, reducer } from 'app/reducer';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './reset.css';
import './index.css';
// import ReactGA from 'react-ga';
// import { hotjar } from 'react-hotjar';

// hotjar.initialize(2578079, 6);
// hotjar.identify('USER_ID', { userProperty: 'value' });

// const TRACKING_ID = "UA-52091685-1"; // YOUR_OWN_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ProjectDM = lazy(() => import('pages/DeviceModels'));
const ProjectDTT = lazy(() => import('pages/DevTechTools'));
const ProjectJO = lazy(() => import('pages/JO'));
const ProjectSolbase = lazy(() => import('pages/Solbase'));
const ProjectPornhub = lazy(() => import('pages/Pornhub'));
const Articles = lazy(() => import('pages/Articles'));
const Uses = lazy(() => import('pages/Uses'));
const Page404 = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const repoPrompt = `\u00A9 2021-${new Date().getFullYear()} Maxime Pocq\n\n`;

const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'light');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!prerender) {
      console.info(`${repoPrompt}\n\n`);
    }

    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <CustomCursor />
      <ThemeProvider themeId={state.theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`http://v2.maximepocq.com${pathname}`} />
      </Helmet>
      <VisuallyHidden showOnFocus as="a" className="skip-to-main" href="#MainContent">
        Skip to main content
      </VisuallyHidden>
      <Navbar location={location} />
      <TransitionGroup component="main" className="app" tabIndex={-1} id="MainContent">
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/projects/device-models" component={ProjectDM} />
                    <Route path="/projects/devtech-tools" component={ProjectDTT} />
                    <Route path="/projects/jo" component={ProjectJO} />
                    <Route path="/projects/Solbase" component={ProjectSolbase} />
                    <Route path="/projects/Pornhub" component={ProjectPornhub} />
                    <Route path="/uses" component={Uses} />
                    <Route path="/articles" component={Articles} />
                    <Route component={Page404} />
                  </Switch>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
};

export default App;
