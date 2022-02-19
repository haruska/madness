/**
 * @generated SignedSource<<94dff16a291d17e32961426d3d3ec8c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Games_viewer$data = {
  readonly tournament64: {
    readonly " $fragmentSpreads": FragmentRefs<"Tournament_tournament">;
  };
  readonly " $fragmentType": "Games_viewer";
};
export type Games_viewer$key = {
  readonly " $data"?: Games_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Games_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Games_viewer",
  "selections": [
    {
      "alias": null,
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
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "1a4d5966c82d46c21f8f21744b7f48a6";

export default node;
