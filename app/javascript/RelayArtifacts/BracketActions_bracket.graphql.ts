/**
 * @generated SignedSource<<04af176dddd5b4972421ea17bbc8ee40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketActions_bracket$data = {
  readonly id: string;
  readonly policy: {
    readonly update: boolean;
  };
  readonly " $fragmentType": "BracketActions_bracket";
};
export type BracketActions_bracket$key = {
  readonly " $data"?: BracketActions_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"BracketActions_bracket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BracketActions_bracket",
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
      "concreteType": "NodePolicy",
      "kind": "LinkedField",
      "name": "policy",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "update",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "1d2f16f9d13ec4c23be29a47bd81831a";

export default node;
