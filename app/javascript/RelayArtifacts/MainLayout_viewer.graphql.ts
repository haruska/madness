/**
 * @generated SignedSource<<c82e0ae7f38cdb3a3b69f07e25d723de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainLayout_viewer$data = {
  readonly tournament64: {
    readonly rounds: ReadonlyArray<{
      readonly name: string;
      readonly number: number;
      readonly startDate: any;
      readonly endDate: any;
      readonly regions: ReadonlyArray<string> | null;
    }>;
    readonly tipOff: any;
    readonly gameDecisions: string;
    readonly gameMask: string;
    readonly started: boolean;
  };
  readonly teams: ReadonlyArray<{
    readonly id: string;
    readonly startingSlot: number;
    readonly seed: number;
    readonly name: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"Header_viewer">;
  readonly " $fragmentType": "MainLayout_viewer";
};
export type MainLayout_viewer$key = {
  readonly " $data"?: MainLayout_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MainLayout_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MainLayout_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Tournament",
      "kind": "LinkedField",
      "name": "tournament64",
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
            (v0/*: any*/),
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
            }
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
          "kind": "ScalarField",
          "name": "gameMask",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "started",
          "storageKey": null
        }
      ],
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
          "name": "id",
          "storageKey": null
        },
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "c06130792fde9dd24392bb2935eedfa5";

export default node;
