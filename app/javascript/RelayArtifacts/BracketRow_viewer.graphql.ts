/**
 * @generated SignedSource<<0221f46251b3623a21936657f34b761b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketRow_viewer$data = {
  readonly currentUser: {
    readonly id: string;
  };
  readonly " $fragmentType": "BracketRow_viewer";
};
export type BracketRow_viewer$key = {
  readonly " $data"?: BracketRow_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"BracketRow_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BracketRow_viewer",
  "selections": [
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
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "26a692eefd6461878e203fdce9610a36";

export default node;
