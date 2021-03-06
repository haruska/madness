/**
 * @generated SignedSource<<c15157fef0cea3811c9edfede0d5943d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserBracketList_viewer$data = {
  readonly id: string;
  readonly brackets: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly paid: boolean;
      readonly user: {
        readonly id: string;
      };
      readonly " $fragmentSpreads": FragmentRefs<"UserSmallBracket_bracket" | "UserBracketRow_bracket">;
    }>;
  };
  readonly " $fragmentType": "UserBracketList_viewer";
};
export type UserBracketList_viewer$key = {
  readonly " $data"?: UserBracketList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserBracketList_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserBracketList_viewer",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
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
              "name": "paid",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "UserSmallBracket_bracket"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "UserBracketRow_bracket"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "ac044655b859d3228fd44859ea9e6da3";

export default node;
