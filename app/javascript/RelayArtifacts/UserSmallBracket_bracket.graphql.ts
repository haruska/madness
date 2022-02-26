/**
 * @generated SignedSource<<8d245063e9921810a74329aa75278514>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSmallBracket_bracket$data = {
  readonly id: string;
  readonly name: string;
  readonly tieBreaker: number;
  readonly paid: boolean;
  readonly finalFour: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FinalFourTeamSmall_team">;
  }>;
  readonly " $fragmentType": "UserSmallBracket_bracket";
};
export type UserSmallBracket_bracket$key = {
  readonly " $data"?: UserSmallBracket_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserSmallBracket_bracket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserSmallBracket_bracket",
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
          "name": "FinalFourTeamSmall_team"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "91140f6f457acba7b21a71f14e5235db";

export default node;
