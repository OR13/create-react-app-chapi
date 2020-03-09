import React from 'react';
import * as chapi from 'credential-handler-polyfill';

import Typography from '@material-ui/core/Typography/Typography'

import Theme from './components/Theme'
import './App.css';

import ReceiveCredential from './components/ReceiveCredential'
import PresentCredential from './components/PresentCredential'

function App() {

  React.useEffect(() => {
    (async () => {
      try {
        await chapi.loadOnce();
      } catch (e) {
        console.error('Error in loadOnce:', e);
      }
    })();
  })
  return (
    <Theme>
      <div className="App">
        <Typography variant="h3">CHAPI DEMO</Typography>
        <ReceiveCredential />
        <PresentCredential />
      </div>
    </Theme>
  );
}

export default App;
