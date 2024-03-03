/**
 * @generated SignedSource<<ec65817ece82333e25b3ec9f8fb9bcba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_BracketList_Query$variables = Record<PropertyKey, never>;
export type Routes_BracketList_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"BracketList_viewer">;
  };
};
export type Routes_BracketList_Query = {
  response: Routes_BracketList_Query$data;
  variables: Routes_BracketList_Query$variables;
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
            "kind": "ScalarField",
            "name": "showEliminated",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 25
              }
            ],
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
                    "selections": [
                      (v0/*: any*/)
                    ],
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
            "storageKey": "brackets(first:25)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d5a6770b20fa2071bf23ecda56515d93",
    "id": null,
    "metadata": {},
    "name": "Routes_BracketList_Query",
    "operationKind": "query",
    "text": "query Routes_BracketList_Query {\n  viewer {\n    ...BracketList_viewer\n    id\n  }\n}\n\nfragment BestPossibleSmall_bracket on Bracket {\n  bestPossibleFinish\n  eliminated\n}\n\nfragment BestPossible_bracket on Bracket {\n  bestPossibleFinish\n  eliminated\n}\n\nfragment BracketList_viewer on Viewer {\n  showEliminated\n  brackets(first: 25) {\n    nodes {\n      id\n      points\n      possiblePoints\n      ...BracketRow_bracket\n      ...SmallBracket_bracket\n    }\n    totalCount\n  }\n}\n\nfragment BracketRow_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossible_bracket\n}\n\nfragment SmallBracket_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossibleSmall_bracket\n}\n"
  }
};
})();

(node as any).hash = "30bad7068d4b87a19bcd3724280a43cd";

export default node;
