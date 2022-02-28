/**
 * @generated SignedSource<<bae2c1618960eee18856b3630120d041>>
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
  readonly finalFour: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FinalFourTeam_team">;
  }>;
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
      "concreteType": "Team",
      "kind": "LinkedField",
      "name": "finalFour",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FinalFourTeam_team"
        }
      ],
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

(node as any).hash = "d9db4be49aefe5c5b99f273c77bd9b46";

export default node;
