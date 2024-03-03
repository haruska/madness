/**
 * @generated SignedSource<<838f0d455271aea2830e97b2a6ad3c5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Bracket_bracket$data = {
  readonly gameDecisions: any;
  readonly id: string;
  readonly name: string;
  readonly user: {
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"BracketActions_bracket">;
  readonly " $fragmentType": "Bracket_bracket";
};
export type Bracket_bracket$key = {
  readonly " $data"?: Bracket_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"Bracket_bracket">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Bracket_bracket",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "gameDecisions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BracketActions_bracket"
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};
})();

(node as any).hash = "49a42e845dd2abde52f52a5a65cb6571";

export default node;
