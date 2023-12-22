import React from 'react';
import AuthProvider from './contexts/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

// export default module.hot ? hot(App) : App;
export default App;
