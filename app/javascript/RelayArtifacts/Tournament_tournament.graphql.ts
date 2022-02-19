/**
 * @generated SignedSource<<64d29803f823a539a1fcacf168763af3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Tournament_tournament$data = {
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
  readonly teams: ReadonlyArray<{
    readonly startingSlot: number;
    readonly seed: number;
    readonly name: string;
  }>;
  readonly " $fragmentType": "Tournament_tournament";
};
export type Tournament_tournament$key = {
  readonly " $data"?: Tournament_tournament$data;
  readonly " $fragmentSpreads": FragmentRefs<"Tournament_tournament">;
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
  "name": "Tournament_tournament",
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Tournament",
  "abstractKey": null
};
})();

(node as any).hash = "d3983fbc9fbd2e6927223682d01faf98";

export default node;
