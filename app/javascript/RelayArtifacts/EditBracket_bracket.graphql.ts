/**
 * @generated SignedSource<<36a490e7e416b9e88676da66b45ff393>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditBracket_bracket$data = {
  readonly id: string;
  readonly name: string;
  readonly tieBreaker: number;
  readonly gameDecisions: string;
  readonly policy: {
    readonly destroy: boolean;
  };
  readonly user: {
    readonly name: string;
  };
  readonly tournament: {
    readonly " $fragmentSpreads": FragmentRefs<"Tournament_tournament">;
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
      "name": "tieBreaker",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tournament",
      "kind": "LinkedField",
      "name": "tournament",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Tournament_tournament"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};
})();

(node as any).hash = "ff0b86497ceb37477b3a96e2e76c2283";

export default node;
