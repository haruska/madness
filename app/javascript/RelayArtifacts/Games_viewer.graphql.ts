/**
 * @generated SignedSource<<e53b4491bec2f3aa350de95be338ed9b>>
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
    readonly id: string;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "4df2954b24bf1df109ff0072aba0a481";

export default node;
