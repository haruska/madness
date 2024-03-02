/**
 * @generated SignedSource<<4ef6ba58a40718ae2b0c6cfc3be8bc57>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Routes_Bracket_Query$variables = {
  bracketId: string;
};
export type Routes_Bracket_Query$data = {
  readonly bracket: {
    readonly " $fragmentSpreads": FragmentRefs<"Bracket_bracket">;
  } | null | undefined;
};
export type Routes_Bracket_Query = {
  response: Routes_Bracket_Query$data;
  variables: Routes_Bracket_Query$variables;
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
    "name": "Routes_Bracket_Query",
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
            "name": "Bracket_bracket"
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
    "name": "Routes_Bracket_Query",
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
                "name": "gameDecisions",
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
                    "name": "update",
                    "storageKey": null
                  }
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
    "cacheID": "1fe479c562d5bc076053a3d8579458df",
    "id": null,
    "metadata": {},
    "name": "Routes_Bracket_Query",
    "operationKind": "query",
    "text": "query Routes_Bracket_Query(\n  $bracketId: ID!\n) {\n  bracket: node(id: $bracketId) {\n    __typename\n    ...Bracket_bracket\n    id\n  }\n}\n\nfragment BracketActions_bracket on Bracket {\n  id\n  policy {\n    update\n  }\n}\n\nfragment Bracket_bracket on Bracket {\n  id\n  name\n  gameDecisions\n  user {\n    name\n    id\n  }\n  ...BracketActions_bracket\n}\n"
  }
};
})();

(node as any).hash = "3b4b3fccf1c52c117dd91ab892e598de";

export default node;
