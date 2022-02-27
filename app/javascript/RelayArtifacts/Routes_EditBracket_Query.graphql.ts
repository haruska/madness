/**
 * @generated SignedSource<<4ebfc2a9cff383bb16e826d0957cb620>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_EditBracket_Query$variables = {
  bracketId: string;
};
export type Routes_EditBracket_Query$data = {
  readonly bracket: {
    readonly " $fragmentSpreads": FragmentRefs<"EditBracket_bracket">;
  } | null;
};
export type Routes_EditBracket_Query = {
  variables: Routes_EditBracket_Query$variables;
  response: Routes_EditBracket_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "bracketId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "bracketId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Routes_EditBracket_Query",
    "selections": [
      {
        "alias": "bracket",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditBracket_bracket"
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
    "name": "Routes_EditBracket_Query",
    "selections": [
      {
        "alias": "bracket",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tieBreaker",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gameDecisions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NodePolicy",
                "kind": "LinkedField",
                "name": "policy",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "destroy",
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
                "name": "user",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Bracket",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e40592f7578ddfef011ae2f56e6405c2",
    "id": null,
    "metadata": {},
    "name": "Routes_EditBracket_Query",
    "operationKind": "query",
    "text": "query Routes_EditBracket_Query(\n  $bracketId: ID!\n) {\n  bracket: node(id: $bracketId) {\n    __typename\n    ...EditBracket_bracket\n    id\n  }\n}\n\nfragment EditBracket_bracket on Bracket {\n  id\n  name\n  tieBreaker\n  gameDecisions\n  policy {\n    destroy\n  }\n  user {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "439e58686958cca246208fce63aa185f";

export default node;
