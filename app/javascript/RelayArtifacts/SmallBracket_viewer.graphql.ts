/**
 * @generated SignedSource<<09680e9bd56652cf4533395c932492d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmallBracket_viewer$data = {
  readonly currentUser: {
    readonly id: string;
  };
  readonly " $fragmentType": "SmallBracket_viewer";
};
export type SmallBracket_viewer$key = {
  readonly " $data"?: SmallBracket_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SmallBracket_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmallBracket_viewer",
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

(node as any).hash = "a49c67194ca1f36d5858c5075caaf675";

export default node;
