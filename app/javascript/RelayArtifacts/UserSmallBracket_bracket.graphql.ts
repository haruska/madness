/**
 * @generated SignedSource<<52fe3dc6853c4d9763de05fc6931746a>>
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

(node as any).hash = "9cd577c77de7d1a8b8398a5d5eedba06";

export default node;
