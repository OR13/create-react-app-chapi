import React from 'react';
import * as WebCredentialHandler from 'web-credential-handler';

import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField/TextField'

import { getVP } from '../help';

import JSONEditor from './JSONEditor'

function ReceiveCredential() {

  const [panelValues, setPanelValues] = React.useState({
    panel0: true,
  });

  const [state, setState] = React.useState({
    credentialSubjectId: 'did:example:credential-subject-123',
  });

  const handleChangePanels = panel => () => {
    setPanelValues({
      ...panelValues,
      // eslint-disable-next-line
      [panel]: !panelValues[panel],
    });
  };


  return (
    <ExpansionPanel
      // eslint-disable-next-line
      expanded={panelValues['panel0']}
      onChange={handleChangePanels('panel0')}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel0-content`}
        id={`panel0-header`}
      >
        <Typography>Receive Credential from Website</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }} >
        <TextField
          required
          id="credentialSubjectId"
          label="Credential Subject ID"
          variant="outlined"
          value={state.credentialSubjectId}
        />
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Button variant={'contained'} onClick={async () => {
            // CORS issue
            // const issuerEndpoint = 'https://issuer-verifier-vc-api.transmute.world/issuer/credential';
            // const vp = await getVP(state.credentialSubjectId);
            // // console.log()
            // let payload = { ...vp.verifiableCredential[0] }
            // delete payload.proof;
            // const response = await fetch(issuerEndpoint, {
            //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //   mode: 'cors', // no-cors, *cors, same-origin
            //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //   // credentials: 'same-origin', // include, *same-origin, omit
            //   headers: {
            //     'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            //   },
            //   redirect: 'follow', // manual, *follow, error
            //   referrerPolicy: 'no-referrer', // no-referrer, *client
            //   body: JSON.stringify(payload) // body data type must match "Content-Type" header
            // });
            // await response.json();
            const WALLET_LOCATION = window.origin;
            const workerUrl = `${WALLET_LOCATION}/worker.html`;
            const registration = await WebCredentialHandler.installHandler({ url: workerUrl });
            await registration.credentialManager.hints.set(
              'test', {
              name: 'TestUser',
              enabledTypes: ['VerifiablePresentation', 'VerifiableCredential', 'UniversityDegreeCredential']
              // enabledTypes: ['VerifiablePresentation']
            });
            console.log('Wallet registered.');

            // Normally get from authenticated network request...
            const vp = await getVP(state.credentialSubjectId);
            const webCredentialWrapper = new global.WebCredential(vp.type, vp);
            // Use Credential Handler API to store
            const result = await navigator.credentials.store(webCredentialWrapper);
            console.log('Result of receiving via store() request:', result);
            setState({
              ...state,
              vp
            })
          }}>Receive Credential</Button>
        </div>

        {state.vp && <JSONEditor jsonObject={state.vp} />}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default ReceiveCredential;
