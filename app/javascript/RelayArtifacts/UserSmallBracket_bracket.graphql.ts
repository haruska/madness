/**
 * @generated SignedSource<<5217e98f2fe3470300f786314e694f0b>>
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
  readonly sortedFour: ReadonlyArray<number>;
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
      "kind": "ScalarField",
      "name": "sortedFour",
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "b752bb3a49a2c28a315aa3c576661d16";

export default node;
