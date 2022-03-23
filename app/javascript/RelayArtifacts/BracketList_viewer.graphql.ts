/**
 * @generated SignedSource<<8861f64ed8472d570d712ebce50efa64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BracketList_viewer$data = {
  readonly showEliminated: boolean;
  readonly brackets: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly points: number;
      readonly possiblePoints: number;
      readonly " $fragmentSpreads": FragmentRefs<"BracketRow_bracket" | "SmallBracket_bracket">;
    }>;
    readonly totalCount: number;
  };
  readonly " $fragmentType": "BracketList_viewer";
};
export type BracketList_viewer$key = {
  readonly " $data"?: BracketList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"BracketList_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 25,
      "kind": "LocalArgument",
      "name": "count"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "BracketList_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "showEliminated",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "count"
        }
      ],
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "points",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "possiblePoints",
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
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "e20dd06a6072992d8f20da36248733bb";

export default node;
