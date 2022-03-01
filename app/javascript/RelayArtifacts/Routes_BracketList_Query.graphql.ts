/**
 * @generated SignedSource<<55be62efe6bc0f603758b73e52a4b7b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_BracketList_Query$variables = {};
export type Routes_BracketList_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"BracketList_viewer">;
  };
};
export type Routes_BracketList_Query = {
  variables: Routes_BracketList_Query$variables;
  response: Routes_BracketList_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Routes_BracketList_Query",
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
            "name": "BracketList_viewer"
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
    "name": "Routes_BracketList_Query",
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
                    "name": "points",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "possiblePoints",
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
                    "name": "eliminated",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sortedFour",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bestPossibleFinish",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "currentUser",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eb8bc51818e0f3268b984fac5a4f8774",
    "id": null,
    "metadata": {},
    "name": "Routes_BracketList_Query",
    "operationKind": "query",
    "text": "query Routes_BracketList_Query {\n  viewer {\n    ...BracketList_viewer\n    id\n  }\n}\n\nfragment BestPossibleSmall_bracket on Bracket {\n  bestPossibleFinish\n  eliminated\n}\n\nfragment BestPossible_bracket on Bracket {\n  bestPossibleFinish\n}\n\nfragment BracketList_viewer on Viewer {\n  brackets {\n    nodes {\n      id\n      points\n      possiblePoints\n      ...BracketRow_bracket\n      ...SmallBracket_bracket\n    }\n    totalCount\n  }\n  ...BracketRow_viewer\n  ...SmallBracket_viewer\n}\n\nfragment BracketRow_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossible_bracket\n}\n\nfragment BracketRow_viewer on Viewer {\n  currentUser {\n    id\n  }\n}\n\nfragment SmallBracket_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossibleSmall_bracket\n}\n\nfragment SmallBracket_viewer on Viewer {\n  currentUser {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "30bad7068d4b87a19bcd3724280a43cd";

export default node;
