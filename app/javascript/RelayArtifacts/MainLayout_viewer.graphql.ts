/**
 * @generated SignedSource<<94e0a17dbd005505492a426221e55865>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainLayout_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Header_viewer">;
  readonly " $fragmentType": "MainLayout_viewer";
};
export type MainLayout_viewer$key = {
  readonly " $data"?: MainLayout_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MainLayout_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MainLayout_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b27f9cacda12ba530705402043acb59a";

export default node;
