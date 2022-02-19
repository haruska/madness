/**
 * @generated SignedSource<<422ffdd429243fb6f0b4cb95aba31738>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Header_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Menu_viewer">;
  readonly " $fragmentType": "Header_viewer";
};
export type Header_viewer$key = {
  readonly " $data"?: Header_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Header_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Menu_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "4cccb4e77ef392499388e52d9e28a619";

export default node;
