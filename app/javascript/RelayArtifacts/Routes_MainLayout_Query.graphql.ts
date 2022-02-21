/**
 * @generated SignedSource<<3db1cdfc46423cd01a7941e922f4c8b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_MainLayout_Query$variables = {};
export type Routes_MainLayout_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"MainLayout_viewer">;
  };
};
export type Routes_MainLayout_Query = {
  variables: Routes_MainLayout_Query$variables;
  response: Routes_MainLayout_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Routes_MainLayout_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MainLayout_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Routes_MainLayout_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
              },
              (v0/*: any*/)
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
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e0d40a2ad0feeb73e3000a714e6f9847",
    "id": null,
    "metadata": {},
    "name": "Routes_MainLayout_Query",
    "operationKind": "query",
    "text": "query Routes_MainLayout_Query {\n  viewer {\n    ...MainLayout_viewer\n    id\n  }\n}\n\nfragment Header_viewer on Viewer {\n  ...Menu_viewer\n}\n\nfragment MainLayout_viewer on Viewer {\n  ...Header_viewer\n}\n\nfragment Menu_viewer on Viewer {\n  currentUser {\n    admin\n    id\n  }\n  tournament64 {\n    started\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "532080886494e3d3979a05a6fdbf65c8";

export default node;
