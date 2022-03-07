/**
 * @generated SignedSource<<68dc7ccdcb7797949fa1ea9994d3240a>>
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

(node as any).hash = "c6d9990e0b96320c956009e95277f931";

export default node;
