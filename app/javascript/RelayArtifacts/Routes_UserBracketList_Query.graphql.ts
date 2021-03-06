/**
 * @generated SignedSource<<79bd5fc30d047b6d2efe386b2098506f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_UserBracketList_Query$variables = {};
export type Routes_UserBracketList_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UserBracketList_viewer">;
  };
};
export type Routes_UserBracketList_Query = {
  variables: Routes_UserBracketList_Query$variables;
  response: Routes_UserBracketList_Query$data;
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
    "name": "Routes_UserBracketList_Query",
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
            "name": "UserBracketList_viewer"
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
    "name": "Routes_UserBracketList_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "BracketConnection",
            "kind": "LinkedField",
            "name": "brackets",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Bracket",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "paid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sortedFour",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "073d2d8c76af4e3b345fb0c24240f42b",
    "id": null,
    "metadata": {},
    "name": "Routes_UserBracketList_Query",
    "operationKind": "query",
    "text": "query Routes_UserBracketList_Query {\n  viewer {\n    ...UserBracketList_viewer\n    id\n  }\n}\n\nfragment UserBracketList_viewer on Viewer {\n  id\n  brackets {\n    nodes {\n      id\n      paid\n      user {\n        id\n      }\n      ...UserSmallBracket_bracket\n      ...UserBracketRow_bracket\n    }\n  }\n}\n\nfragment UserBracketRow_bracket on Bracket {\n  id\n  name\n  paid\n  sortedFour\n}\n\nfragment UserSmallBracket_bracket on Bracket {\n  id\n  name\n  paid\n  sortedFour\n}\n"
  }
};
})();

(node as any).hash = "93127271c8846d8548f1abe920008fdb";

export default node;
