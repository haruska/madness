/**
 * @generated SignedSource<<2f56d67e3d068c330ca1c2321f89aa3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmallBracket_bracket$data = {
  readonly eliminated: boolean;
  readonly id: string;
  readonly name: string;
  readonly points: number;
  readonly possiblePoints: number;
  readonly sortedFour: ReadonlyArray<number>;
  readonly user: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"BestPossibleSmall_bracket">;
  readonly " $fragmentType": "SmallBracket_bracket";
};
export type SmallBracket_bracket$key = {
  readonly " $data"?: SmallBracket_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"SmallBracket_bracket">;
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
  "name": "SmallBracket_bracket",
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
      "name": "BestPossibleSmall_bracket"
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};
})();

(node as any).hash = "3696cf485ab9531bd9f2f9663083ed58";

export default node;
