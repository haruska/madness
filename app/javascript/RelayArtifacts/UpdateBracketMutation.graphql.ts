/**
 * @generated SignedSource<<a70115e236f31feb1579fd2ae2e1a766>>
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
  tieBreaker?: number | null;
};
export type UpdateBracketMutation$variables = {
  input: UpdateBracketInput;
};
export type UpdateBracketMutation$data = {
  readonly updateBracket: {
    readonly bracket: {
      readonly id: string;
      readonly name: string;
      readonly tieBreaker: number;
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
            "name": "tieBreaker",
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
    "cacheID": "e4f38c8386b70172abe11dd48344fc9e",
    "id": null,
    "metadata": {},
    "name": "UpdateBracketMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateBracketMutation(\n  $input: UpdateBracketInput!\n) {\n  updateBracket(input: $input) {\n    bracket {\n      id\n      name\n      tieBreaker\n      gameDecisions\n    }\n    errors {\n      path\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ffa0c39ecdc00dd5de814ea88dfeeb72";

export default node;
