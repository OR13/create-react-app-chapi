import React from 'react';
import * as chapi from 'credential-handler-polyfill';
import * as WebCredentialHandler from 'web-credential-handler';

import './App.css';

const testCredential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "type": "VerifiablePresentation",
  "verifiableCredential": [{
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": "http://example.edu/credentials/1872",
    "type": ["VerifiableCredential", "AlumniCredential"],
    "issuer": "https://example.edu/issuers/565049",
    "issuanceDate": "2010-01-01T19:73:24Z",
    "credentialSubject": {
      "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
      "alumniOf": {
        "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",
        "name": {
          "value": "Example University",
          "lang": "en"
        }
      }
    },
    "proof": {
      "type": "RsaSignature2018",
      "created": "2017-06-18T21:19:10Z",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "https://example.edu/issuers/keys/1",
      "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
    }
  }]
};

const credentialQuery = {
  web: {
    VerifiablePresentation: {
      query: [
        {
          type: 'QueryByExample',
          credentialQuery: {
            reason: 'Please present an AlumniCredential for JaneDoe.',
            example: {
              '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://www.w3.org/2018/credentials/examples/v1',
              ],
              type: ['VerifiablePresentation'],
              credentialSubject: {
                id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
              },
            },
          },
        },
      ],
    },
  },
};

function App() {

  const [state, setState] = React.useState({

  })

  React.useEffect(()=>{
    (async ()=>{
      try {
        await chapi.loadOnce();
      } catch(e) {
        console.error('Error in loadOnce:', e);
      }
    })();
  })
  return (
    <div className="App">
      <h3>CHAPI CREATE REACT APP</h3>
      <div>
        <button onClick={async ()=>{
          const WALLET_LOCATION = window.origin;
          const workerUrl = `${WALLET_LOCATION}/worker.html`;
          const registration = await WebCredentialHandler.installHandler({url: workerUrl});
          await registration.credentialManager.hints.set(
            'test', {
              name: 'TestUser',
              enabledTypes: ['VerifiablePresentation', 'VerifiableCredential', 'AlumniCredential']
              // enabledTypes: ['VerifiablePresentation']
            });
          console.log('Wallet registered.');
          const webCredentialWrapper = new global.WebCredential(testCredential.type, testCredential);
          // Use Credential Handler API to store
          const result = await navigator.credentials.store(webCredentialWrapper);
          console.log('Result of receiving via store() request:', result);
        }}>Receive Credential From Website</button>
      </div>

      <div>
        <button onClick={async ()=>{
           const result = await navigator.credentials.get(credentialQuery);
           console.log(result);
           setState({
             vp: result.data
           })
        }}>Share Credential With Website</button>
      </div>

      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
