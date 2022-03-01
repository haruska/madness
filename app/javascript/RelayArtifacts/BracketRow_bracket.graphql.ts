/**
 * @generated SignedSource<<bb8c119a4ce2c2116caa6b6c60a38cf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketRow_bracket$data = {
  readonly id: string;
  readonly name: string;
  readonly points: number;
  readonly possiblePoints: number;
  readonly eliminated: boolean;
  readonly user: {
    readonly id: string;
  };
  readonly sortedFour: ReadonlyArray<number>;
  readonly " $fragmentSpreads": FragmentRefs<"BestPossible_bracket">;
  readonly " $fragmentType": "BracketRow_bracket";
};
export type BracketRow_bracket$key = {
  readonly " $data"?: BracketRow_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"BracketRow_bracket">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BracketRow_bracket",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "points",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "possiblePoints",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eliminated",
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
      "kind": "ScalarField",
      "name": "sortedFour",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BestPossible_bracket"
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};
})();

(node as any).hash = "739d828fb1bf4ddea2a584b2673b712a";

export default node;
