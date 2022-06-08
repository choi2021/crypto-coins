import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { isDarkState } from './atoms';
import Reset from './Reset';
import Router from './Router';
import { DarkTheme, LightTheme } from './theme';

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <Reset />
        <Router></Router>
      </ThemeProvider>
    </>
  );
}

export default App;
