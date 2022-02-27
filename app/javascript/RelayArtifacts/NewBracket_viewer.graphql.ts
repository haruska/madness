/**
 * @generated SignedSource<<79028e91b132fe59f1698644095d0444>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewBracket_viewer$data = {
  readonly tournament: {
    readonly " $fragmentSpreads": FragmentRefs<"Tournament_tournament">;
  };
  readonly currentUser: {
    readonly name: string;
  };
  readonly " $fragmentType": "NewBracket_viewer";
};
export type NewBracket_viewer$key = {
  readonly " $data"?: NewBracket_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewBracket_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewBracket_viewer",
  "selections": [
    {
      "alias": "tournament",
      "args": null,
      "concreteType": "Tournament",
      "kind": "LinkedField",
      "name": "tournament64",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Tournament_tournament"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "currentUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "ca58e57f5bd956e8b7aefb5336abbc8c";

export default node;
