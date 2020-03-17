
import { Ed25519KeyPair } from "crypto-ld";
// import didMethodKey from "did-method-key";
import vcjs from 'vc-js'
import jsigs from 'jsonld-signatures'
import documentLoader from './documentLoader'

import privateKey from './data/privateKey.json'
import vcBindingModel from './data/vc.bindingModel.json'

const { Ed25519Signature2018 } = jsigs.suites;
// const { keyToDidDoc } = didMethodKey.driver();



const { AuthenticationProofPurpose } = jsigs.purposes;

const key = new Ed25519KeyPair({
  ...privateKey,
  id: 'did:web:chapi.did.ai#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
  controller: 'did:web:chapi.did.ai',
});

const suite = new Ed25519Signature2018({
  key: key,
  verificationMethod: key.id
});

export const getVC = async (credentialSubjectId) => {
  const vc = await vcjs.issue({
    credential: {
      ...vcBindingModel,
      issuer: key.controller,
      credentialSubject: {
        ...vcBindingModel.credentialSubject,
        id: credentialSubjectId
      }
    },
    suite,
    // documentLoader
  })
  return vc;
}

export const getVP = async (credentialType, credentialSubjectId, proofPurposeOptions) => {

  if (credentialType === 'DIDAuth') {
    const p = {
      '@context': 'https://www.w3.org/2018/credentials/v1',
      type: 'VerifiablePresentation',
      holder: credentialSubjectId,
    }
    const vp = await jsigs.sign(
      { ...p },
      {
        compactProof: false,
        documentLoader: documentLoader,
        purpose: new AuthenticationProofPurpose(proofPurposeOptions),
        suite
      }
    );
    return vp;
  }

  const vc = await getVC(credentialSubjectId);
  const vp = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "type": "VerifiablePresentation",
    "verifiableCredential": [vc]
  };
  return vp;
}

export const getChapiQuery = (credentialType) => {

  switch (credentialType) {
    case 'DIDAuth': return {
      web: {
        VerifiablePresentation: {
          query: {
            type: 'DIDAuth'
          },
          // a 128-bit randomly generated value encoded as a string (use a UUID);
          // it will be digitally signed in the authentication proof
          // that will be attached to the VerifiablePresentation response
          challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
          // the domain that must be digitally signed in the authentication
          // proof that will be attached to the VerifiablePresentation
          // response, identifying the recipient
          domain: 'issuer.example.com'
        }
      }
    };
    default: return {
      web: {
        VerifiablePresentation: {
          query: [
            {
              type: 'QueryByExample',
              credentialQuery: {
                reason: `Please present an ${credentialType} for JaneDoe.`,
                example: {
                  '@context': [
                    'https://www.w3.org/2018/credentials/v1',
                    'https://www.w3.org/2018/credentials/examples/v1',
                  ],
                  type: [credentialType],
                },
              },
            },
          ],
        },
      },
    }
  }

}