import React from 'react';

import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField'

import MenuItem from '@material-ui/core/MenuItem';

import JSONEditor from './JSONEditor'


const currencies = [
  {
    value: 'UniversityDegreeCredential',
    label: 'UniversityDegreeCredential',
  },
  {
    value: 'other...',
    label: 'other',
  },

];

function PresentCredential() {

  const [panelValues, setPanelValues] = React.useState({
    panel0: true,
  });

  const [state, setState] = React.useState({
    credentialSubjectId: 'did:example:credential-subject-123',
    credentialType: 'UniversityDegreeCredential'
  });


  const handleChange = event => {
    setState({ ...state, credentialType: event.target.value });
  };

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
        <Typography>Present Credential to Website</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }} >
        <TextField
          id="outlined-select-credentialType"
          select
          label="Credential Type"
          value={state.credentialType}
          onChange={handleChange}
          helperText="Please select your a Credential Type"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Button variant={'contained'} onClick={async () => {

            const credentialQuery = {
              web: {
                VerifiablePresentation: {
                  query: [
                    {
                      type: 'QueryByExample',
                      credentialQuery: {
                        reason: `Please present an ${state.credentialType} for JaneDoe.`,
                        example: {
                          '@context': [
                            'https://www.w3.org/2018/credentials/v1',
                            'https://www.w3.org/2018/credentials/examples/v1',
                          ],
                          type: [state.credentialType],
                        },
                      },
                    },
                  ],
                },
              },
            };
            const result = await navigator.credentials.get(credentialQuery);
            // normally submit credential to http endpoint.. display for demo...
            setState({
              ...state,
              vp: result.data
            })
          }}>Present Credential</Button>
        </div>

        {state.vp && <JSONEditor jsonObject={state.vp} />}

      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default PresentCredential;
