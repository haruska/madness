/**
 * @generated SignedSource<<e86587572f8db9611cf26ad101f98ab6>>
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
  readonly sortedFour: ReadonlyArray<number>;
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
      "kind": "ScalarField",
      "name": "sortedFour",
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "1353646bae5e65bbfbd3737dbf2d7ff4";

export default node;
