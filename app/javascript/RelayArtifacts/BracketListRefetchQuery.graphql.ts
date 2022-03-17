/**
 * @generated SignedSource<<ae63e2e53d9d42fec8b235254d17a6cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketListRefetchQuery$variables = {
  count: number;
};
export type BracketListRefetchQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"BracketList_viewer">;
  };
};
export type BracketListRefetchQuery = {
  variables: BracketListRefetchQuery$variables;
  response: BracketListRefetchQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BracketListRefetchQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              }
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BracketListRefetchQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "count"
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
                  (v1/*: any*/),
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
                      (v1/*: any*/)
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
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e8e143c1196575faffee010a47b143fe",
    "id": null,
    "metadata": {},
    "name": "BracketListRefetchQuery",
    "operationKind": "query",
    "text": "query BracketListRefetchQuery(\n  $count: Int!\n) {\n  viewer {\n    ...BracketList_viewer_yu5n1\n    id\n  }\n}\n\nfragment BestPossibleSmall_bracket on Bracket {\n  bestPossibleFinish\n  eliminated\n}\n\nfragment BestPossible_bracket on Bracket {\n  bestPossibleFinish\n}\n\nfragment BracketList_viewer_yu5n1 on Viewer {\n  brackets(first: $count) {\n    nodes {\n      id\n      points\n      possiblePoints\n      ...BracketRow_bracket\n      ...SmallBracket_bracket\n    }\n    totalCount\n  }\n}\n\nfragment BracketRow_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossible_bracket\n}\n\nfragment SmallBracket_bracket on Bracket {\n  id\n  name\n  points\n  possiblePoints\n  eliminated\n  user {\n    id\n  }\n  sortedFour\n  ...BestPossibleSmall_bracket\n}\n"
  }
};
})();

(node as any).hash = "2803dcf39d3587875d109dabbe324038";

export default node;
