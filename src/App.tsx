import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './Router';

function App() {
  return (
    <>
      <ReactQueryDevtools></ReactQueryDevtools>
      <Router></Router>
    </>
  );
}

export default App;
