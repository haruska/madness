/**
 * @generated SignedSource<<852095606e4ae52591d3db0865046df2>>
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
            "concreteType": "CurrentUser",
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
    "cacheID": "3ad67c2a97f3c23c610ac1cb6f7f66d3",
    "id": null,
    "metadata": {},
    "name": "Routes_MainLayout_Query",
    "operationKind": "query",
    "text": "query Routes_MainLayout_Query {\n  viewer {\n    ...MainLayout_viewer\n    id\n  }\n}\n\nfragment Header_viewer on Viewer {\n  ...Menu_viewer\n}\n\nfragment MainLayout_viewer on Viewer {\n  ...Header_viewer\n}\n\nfragment Menu_viewer on Viewer {\n  currentUser {\n    admin\n  }\n  tournament64 {\n    started\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "532080886494e3d3979a05a6fdbf65c8";

export default node;
