import { lazy, Suspense, useEffect, createContext, useReducer, Fragment, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import posthog from 'posthog-js';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import ThemeProvider from 'components/ThemeProvider';
import CustomCursor from 'components/CustomCursor';
import ChatBot from 'components/ChatBot';
import VisuallyHidden from 'components/VisuallyHidden';
import { tokens } from 'components/ThemeProvider/theme';
import { msToNum } from 'utils/style';
import { useLocalStorage } from 'hooks';
import { initialState, reducer } from 'app/reducer';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './reset.css';
import './index.css';

// ── PostHog Analytics ──
// Replace with your PostHog API key after signup at https://app.posthog.com/signup
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_DIRECT_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';
const POSTHOG_API_HOST = import.meta.env.DEV
  ? POSTHOG_DIRECT_HOST
  : (import.meta.env.VITE_POSTHOG_API_HOST || '/_relay');
const POSTHOG_UI_HOST = import.meta.env.VITE_POSTHOG_UI_HOST || 'https://eu.posthog.com';

if (!prerender && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_API_HOST,
    ui_host: POSTHOG_UI_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,   // handled manually for SPA
    capture_pageleave: true,   // powers time-on-page + scroll depth
    autocapture: true,         // clicks, inputs, form submits
    scroll_depth: true,        // scroll depth tracking
    heatmaps: true,            // click + scroll heatmaps
    session_recording: {
      maskAllInputs: true,     // mask form inputs for privacy
    },
  });
}

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ProjectDM = lazy(() => import('pages/DeviceModels'));
const ProjectDTT = lazy(() => import('pages/DevTechTools'));
const ProjectJO = lazy(() => import('pages/JO'));
const ProjectSolbase = lazy(() => import('pages/Solbase'));
const ProjectPornhub = lazy(() => import('pages/Pornhub'));
const CaseStudy = lazy(() => import('pages/CaseStudy'));
const Articles = lazy(() => import('pages/Articles'));
const Uses = lazy(() => import('pages/Uses'));
const Page404 = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const repoPrompt = `\u00A9 2021-${new Date().getFullYear()} Maxime Pocq\n\n`;

const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
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
      <Analytics />
      <CustomCursor />
      <ThemeProvider themeId={state.theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ChatBot />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;
  const prevPathname = useRef(pathname);

  // Track initial pageview on mount
  useEffect(() => {
    if (POSTHOG_KEY) {
      posthog.capture('$pageview', { $current_url: window.location.href });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Track SPA pageviews on route change
  useEffect(() => {
    if (POSTHOG_KEY && prevPathname.current !== pathname) {
      posthog.capture('$pageview', { $current_url: window.location.href });
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://maximepocq.com${pathname}`} />
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
                    <Route exact path="/projects/device-models" component={ProjectDM} />
                    <Route exact path="/projects/devtech-tools" component={ProjectDTT} />
                    <Route exact path={["/projects/jo", "/projects/JO"]} component={ProjectJO} />
                    <Route exact path={["/projects/solbase", "/projects/Solbase"]} component={ProjectSolbase} />
                    <Route exact path={["/projects/pornhub", "/projects/Pornhub"]} component={ProjectPornhub} />
                    <Redirect exact from="/projects/solbase/" to="/projects/solbase" />
                    <Redirect exact from="/projects/Solbase/" to="/projects/solbase" />
                    <Redirect exact from="/projects/pornhub/" to="/projects/pornhub" />
                    <Redirect exact from="/projects/Pornhub/" to="/projects/pornhub" />
                    <Redirect exact from="/projects/JO/" to="/projects/jo" />
                    <Route path="/projects/:slug" component={CaseStudy} />
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
