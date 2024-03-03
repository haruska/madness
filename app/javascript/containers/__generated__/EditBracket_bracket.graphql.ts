/**
 * @generated SignedSource<<6a15088052e0951e5c5fc2d557d06a73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditBracket_bracket$data = {
  readonly gameDecisions: any;
  readonly id: string;
  readonly name: string;
  readonly policy: {
    readonly destroy: boolean;
  };
  readonly user: {
    readonly name: string;
  };
  readonly " $fragmentType": "EditBracket_bracket";
};
export type EditBracket_bracket$key = {
  readonly " $data"?: EditBracket_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditBracket_bracket">;
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
  "name": "EditBracket_bracket",
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
      "concreteType": "NodePolicy",
      "kind": "LinkedField",
      "name": "policy",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "destroy",
          "storageKey": null
        }
      ],
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
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};
})();

(node as any).hash = "c6ce040e8f4531a610fad56a6dc81c80";

export default node;
