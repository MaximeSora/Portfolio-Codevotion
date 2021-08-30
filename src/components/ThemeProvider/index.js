import { createContext, Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import useTheme from './useTheme';
import { theme, tokens } from './theme';
import { media } from 'utils/style';
import InterRegular from 'assets/fonts/Inter-Regular.ttf';
import InterBold from 'assets/fonts/Inter-Bold.ttf';

export const fontStyles = `
  @font-face {
    font-family: "Inter";
    font-weight: 400;
    src: url(${InterRegular}) format("ttf");
    font-display: swap;
  }

  @font-face {
    font-family: "Inter";
    font-weight: 700;
    src: url(${InterBold}) format("ttf");
    font-display: swap;
  }
`;

const ThemeContext = createContext({});

const ThemeProvider = ({
  themeId = 'dark',
  theme: themeOverrides,
  children,
  className,
  as: Component = 'div',
}) => {
  const currentTheme = { ...theme[themeId], ...themeOverrides };
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.themeId;

  // Save root theme id to localstorage and apply class to body
  useEffect(() => {
    if (isRootProvider) {
      window.localStorage.setItem('theme', JSON.stringify(themeId));
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(themeId);
    }
  }, [themeId, isRootProvider]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {/* Add fonts and base tokens for the root provider */}
      {isRootProvider && (
        <Fragment>
          <Helmet>
            <link rel="preload" href={InterBold} as="font" crossorigin="" />
            <link rel="preload" href={InterRegular} as="font" crossorigin="" />
            <style>{fontStyles}</style>
            <style>{tokenStyles}</style>
          </Helmet>
          {children}
        </Fragment>
      )}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component
          className={classNames('theme-provider', className)}
          style={createThemeStyleObject(currentTheme)}
        >
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};

/**
 * Transform theme token objects into CSS custom property strings
 */
function createThemeProperties(theme) {
  return Object.keys(theme)
    .filter(key => key !== 'themeId')
    .map(key => `--${key}: ${theme[key]};`)
    .join('\n');
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
function createThemeStyleObject(theme) {
  let style = {};

  for (const key of Object.keys(theme)) {
    if (key !== 'themeId') {
      style[`--${key}`] = theme[key];
    }
  }

  return style;
}

/**
 * Generate media queries for tokens
 */
function createMediaTokenProperties() {
  return Object.keys(media)
    .map(key => {
      return `
        @media (max-width: ${media[key]}px) {
          :root {
            --maxWidthS: 480px;
            --maxWidthM: 640px;
            --maxWidthL: 1200px;
            --maxWidthXL: 1440px;
            --spaceOuter: 48px;
            --fontSizeH0: 6.25rem;
            --fontSizeH1: 4.375rem;
            --fontSizeH2: 3.5rem;
            --fontSizeH3: 2.5rem;
            --fontSizeH4: 1.8rem;
          }
        }
      `;
    })
    .join('\n');
}

export const tokenStyles = `
  :root {
    --rgbBlack: 0 0 0;
    --rgbWhite: 255 255 255;
    --bezierFastoutSlowin: cubic-bezier(0.4, 0.0, 0.2, 1);
    --durationXS: 200ms;
    --durationS: 300ms;
    --durationM: 400ms;
    --durationL: 600ms;
    --durationXL: 800ms;
    --systemFontStack: system-ui, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Ubuntu, Helvetica Neue, sans-serif;
    --fontStack: Inter, system-ui, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Ubuntu, Helvetica Neue, sans-serif;
    --monoFontStack: SFMono Regular, Roboto Mono, Consolas, Liberation Mono, Menlo, Courier, monospace;
    --japaneseFontStack: ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Hiragino Sans, Osaka, メイリオ, Meiryo, Segoe UI, sans-serif;
    --fontWeightRegular: 400;
    --fontWeightMedium: 500;
    --fontWeightBold: 700;
    --fontSizeH0: 8.75rem;
    --fontSizeH1: 6.25rem;
    --fontSizeH2: 4.2rem;
    --fontSizeH3: 3.375rem;
    --fontSizeH4: 2rem;
    --fontSizeBodyXL: 1.375rem;
    --fontSizeBodyL: 1.25rem;
    --fontSizeBodyM: 1.125rem;
    --fontSizeBodyS: 1rem;
    --fontSizeBodyXS: 0.875rem;
    --lineHeightTitle: 1.3;
    --lineHeightBody: 1.6;
    --maxWidthS: 540px;
    --maxWidthM: 720px;
    --maxWidthL: 1400px;
    --maxWidthXL: 1680px;
    --spaceOuter: 64px;
    --spaceXS: 4px;
    --spaceS: 8px;
    --spaceM: 16px;
    --spaceL: 24px;
    --spaceXL: 32px;
    --space2XL: 48px;
    --space3XL: 64px;
    --space4XL: 96px;
    --space5XL: 128px;
  }

  ${createMediaTokenProperties()}

  .dark {
    --rgbBackground: 17 17 17;
    --rgbBackgroundLight: 26 26 26;
    --rgbPrimary: 13 197 177;
    --rgbAccent: 13 197 177;
    --rgbText: 255 255 255;
    --rgbError: 255 0 60;
    --colorTextTitle: rgb(var(--rgbText) / 1);
    --colorTextBody: rgb(var(--rgbText) / 0.8);
    --colorTextLight: rgb(var(--rgbText) / 0.6);
  }

  .light {
    --rgbBackground: 242 242 242;
    --rgbBackgroundLight: 255 255 255;
    --rgbPrimary: 13 197 177;
    --rgbAccent: 13 197 177;
    --rgbText: 0 0 0;
    --rgbError: 210 14 60;
    --colorTextTitle: rgb(var(--rgbText) / 1);
    --colorTextBody: rgb(var(--rgbText) / 0.7);
    --colorTextLight: rgb(var(--rgbText) / 0.6);
  }
`;

export {
  theme,
  useTheme,
  ThemeContext,
  createThemeProperties,
  createThemeStyleObject,
  createMediaTokenProperties,
};

export default ThemeProvider;
