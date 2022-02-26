/**
 * @generated SignedSource<<21ea4919d3db957f6869e9685d4911be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserBracketRow_bracket$data = {
  readonly id: string;
  readonly name: string;
  readonly tieBreaker: number;
  readonly paid: boolean;
  readonly finalFour: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FinalFourTeam_team">;
  }>;
  readonly " $fragmentType": "UserBracketRow_bracket";
};
export type UserBracketRow_bracket$key = {
  readonly " $data"?: UserBracketRow_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserBracketRow_bracket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserBracketRow_bracket",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "tieBreaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paid",
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
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "340a31f013ee714655fdf885de91424c";

export default node;
