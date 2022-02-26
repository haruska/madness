/**
 * @generated SignedSource<<4967b99abbc0617e5fa9278839f6e179>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Bracket_bracket$data = {
  readonly id: string;
  readonly name: string;
  readonly tieBreaker: number;
  readonly gameDecisions: string;
  readonly user: {
    readonly name: string;
  };
  readonly tournament: {
    readonly " $fragmentSpreads": FragmentRefs<"Tournament_tournament">;
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

(node as any).hash = "b6a8a27d7458f5b52270cc5493a870d1";

export default node;
