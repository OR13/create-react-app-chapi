
import { Ed25519KeyPair } from "crypto-ld";
// import didMethodKey from "did-method-key";
import vcjs from 'vc-js'
import jsigs from 'jsonld-signatures'

import privateKey from './data/privateKey.json'
import vcBindingModel from './data/vc.bindingModel.json'

const { Ed25519Signature2018 } = jsigs.suites;
// const { keyToDidDoc } = didMethodKey.driver();

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

export const getVP = async (credentialSubjectId) => {
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