/**
 * @generated SignedSource<<73819f1e4c2fa772f72794e2e89b7ca2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateTournamentInput = {
  clientMutationId?: string | null;
  gameDecisions?: string | null;
  gameMask?: string | null;
};
export type UpdateTournamentMutation$variables = {
  input: UpdateTournamentInput;
};
export type UpdateTournamentMutation$data = {
  readonly updateTournament: {
    readonly tournament: {
      readonly gameMask: string;
      readonly gameDecisions: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly path: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  };
};
export type UpdateTournamentMutation = {
  variables: UpdateTournamentMutation$variables;
  response: UpdateTournamentMutation$data;
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
  "name": "gameMask",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gameDecisions",
  "storageKey": null
},
v4 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateTournamentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateTournamentPayload",
        "kind": "LinkedField",
        "name": "updateTournament",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
    "name": "UpdateTournamentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateTournamentPayload",
        "kind": "LinkedField",
        "name": "updateTournament",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "tournament",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca4027065179ab1cd402493904b6a44b",
    "id": null,
    "metadata": {},
    "name": "UpdateTournamentMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateTournamentMutation(\n  $input: UpdateTournamentInput!\n) {\n  updateTournament(input: $input) {\n    tournament {\n      gameMask\n      gameDecisions\n      id\n    }\n    errors {\n      path\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f23300ef1db48cecc1903cfe4be622ab";

export default node;
