/**
 * @generated SignedSource<<49f18f03b3fb0296cac806f71d7319a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteBracketInput = {
  bracketId: string;
  clientMutationId?: string | null;
};
export type DeleteBracketMutation$variables = {
  input: DeleteBracketInput;
};
export type DeleteBracketMutation$data = {
  readonly deleteBracket: {
    readonly deletedBracketId: string | null;
    readonly errors: ReadonlyArray<{
      readonly path: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  };
};
export type DeleteBracketMutation = {
  variables: DeleteBracketMutation$variables;
  response: DeleteBracketMutation$data;
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
    "concreteType": "DeleteBracketPayload",
    "kind": "LinkedField",
    "name": "deleteBracket",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedBracketId",
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
    "name": "DeleteBracketMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteBracketMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aa104cf66da297b5fa5a2dfbe70a741e",
    "id": null,
    "metadata": {},
    "name": "DeleteBracketMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteBracketMutation(\n  $input: DeleteBracketInput!\n) {\n  deleteBracket(input: $input) {\n    deletedBracketId\n    errors {\n      path\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "74384a1366d8ca6119b375766eb0458c";

export default node;
