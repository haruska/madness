/**
 * @generated SignedSource<<c9a15a85e139a3f09c5b042d776dd390>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketList_viewer$data = {
  readonly brackets: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"BracketRow_bracket" | "SmallBracket_bracket">;
    }>;
    readonly totalCount: number;
  };
  readonly " $fragmentSpreads": FragmentRefs<"BracketRow_viewer" | "SmallBracket_viewer">;
  readonly " $fragmentType": "BracketList_viewer";
};
export type BracketList_viewer$key = {
  readonly " $data"?: BracketList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"BracketList_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BracketList_viewer",
  "selections": [
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "BracketRow_bracket"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SmallBracket_bracket"
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
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BracketRow_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SmallBracket_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "624274bf32568c7be5b3a20997345e38";

export default node;
