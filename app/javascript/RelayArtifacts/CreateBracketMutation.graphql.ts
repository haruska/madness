/**
 * @generated SignedSource<<3a3f0cb33b902a52c892e21d86b73176>>
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
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gameDecisions",
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
              (v5/*: any*/),
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Tournament",
                "kind": "LinkedField",
                "name": "tournament",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Round",
                    "kind": "LinkedField",
                    "name": "rounds",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "number",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "regions",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tipOff",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "gameMask",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Team",
                    "kind": "LinkedField",
                    "name": "teams",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startingSlot",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "seed",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
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
    "cacheID": "8b7a2093054a39987cb3eaf128341c51",
    "id": null,
    "metadata": {},
    "name": "CreateBracketMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBracketMutation(\n  $input: CreateBracketInput!\n) {\n  createBracket(input: $input) {\n    bracket {\n      id\n      ...EditBracket_bracket\n    }\n    errors {\n      path\n      message\n    }\n  }\n}\n\nfragment EditBracket_bracket on Bracket {\n  id\n  name\n  tieBreaker\n  gameDecisions\n  policy {\n    destroy\n  }\n  user {\n    name\n    id\n  }\n  tournament {\n    ...Tournament_tournament\n    id\n  }\n}\n\nfragment Tournament_tournament on Tournament {\n  rounds {\n    name\n    number\n    startDate\n    endDate\n    regions\n    id\n  }\n  tipOff\n  gameDecisions\n  gameMask\n  teams {\n    startingSlot\n    seed\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8fbcda60c6297a1a76001470dcb24266";

export default node;
