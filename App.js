import { useEffect } from 'react';

import Routes from './routes';
import { SplashScreen } from './screens';
import { useReducerWithThunks } from './hooks';
import reducer, { initialState } from './store/reducer';
import { getLanguages, getUser } from './store/thunks';
import AppContext from './store/context';
import { restoreToken } from './utils/helpers';

const App = () => {
  const [state, dispatch] = useReducerWithThunks(reducer, initialState);

  useEffect(() => {
    restoreToken().then(() => dispatch(getUser()));
  }, []);

  // get list of supported languages on successful login
  useEffect(() => {
    if (state.user) dispatch(getLanguages());
  }, [state.user]);

  if (state.loading) {
    return <SplashScreen />;
  }

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Routes />
    </AppContext.Provider>
  );
};

export default App;
