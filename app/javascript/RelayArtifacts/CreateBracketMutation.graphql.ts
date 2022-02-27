/**
 * @generated SignedSource<<f9086aa2ddd32ef07a569efb2fc324c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateBracketInput = {
  clientMutationId?: string | null;
  gameDecisions: string;
  name: string;
  tieBreaker: number;
};
export type CreateBracketMutation$variables = {
  input: CreateBracketInput;
};
export type CreateBracketMutation$data = {
  readonly createBracket: {
    readonly bracket: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"EditBracket_bracket">;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly path: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  };
};
export type CreateBracketMutation = {
  variables: CreateBracketMutation$variables;
  response: CreateBracketMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "concreteType": "UserError",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "path",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
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
    "name": "CreateBracketMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBracketPayload",
        "kind": "LinkedField",
        "name": "createBracket",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bracket",
            "kind": "LinkedField",
            "name": "bracket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditBracket_bracket"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateBracketMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBracketPayload",
        "kind": "LinkedField",
        "name": "createBracket",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bracket",
            "kind": "LinkedField",
            "name": "bracket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
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
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca017d97337eaac9025e3b9527d33e1d",
    "id": null,
    "metadata": {},
    "name": "CreateBracketMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBracketMutation(\n  $input: CreateBracketInput!\n) {\n  createBracket(input: $input) {\n    bracket {\n      id\n      ...EditBracket_bracket\n    }\n    errors {\n      path\n      message\n    }\n  }\n}\n\nfragment EditBracket_bracket on Bracket {\n  id\n  name\n  tieBreaker\n  gameDecisions\n  policy {\n    destroy\n  }\n  user {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8fbcda60c6297a1a76001470dcb24266";

export default node;
