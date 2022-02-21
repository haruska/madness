/**
 * @generated SignedSource<<0df722944710ba095011d87422f1e848>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Menu_viewer$data = {
  readonly currentUser: {
    readonly admin: boolean;
  };
  readonly tournament64: {
    readonly started: boolean;
  };
  readonly " $fragmentType": "Menu_viewer";
};
export type Menu_viewer$key = {
  readonly " $data"?: Menu_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Menu_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Menu_viewer",
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
          "name": "admin",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "name": "started",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "440b1e8f8071ad070f1dd1b18b940a89";

export default node;
