/**
 * @generated SignedSource<<8a84d643eb613a85d36bafd37ab95d57>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateBracketInput = {
  bracketId: string;
  clientMutationId?: string | null;
  gameDecisions?: string | null;
  name?: string | null;
};
export type UpdateBracketMutation$variables = {
  input: UpdateBracketInput;
};
export type UpdateBracketMutation$data = {
  readonly updateBracket: {
    readonly bracket: {
      readonly id: string;
      readonly name: string;
      readonly gameDecisions: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly path: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  };
};
export type UpdateBracketMutation = {
  variables: UpdateBracketMutation$variables;
  response: UpdateBracketMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateBracketPayload",
    "kind": "LinkedField",
    "name": "updateBracket",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
            "name": "gameDecisions",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateBracketMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateBracketMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cc3f52f333b32281df7d3aeed953855e",
    "id": null,
    "metadata": {},
    "name": "UpdateBracketMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateBracketMutation(\n  $input: UpdateBracketInput!\n) {\n  updateBracket(input: $input) {\n    bracket {\n      id\n      name\n      gameDecisions\n    }\n    errors {\n      path\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b217f511dd89f7eec04360792c687efe";

export default node;
