/**
 * @generated SignedSource<<859799bfede7791a45f06e1227502e79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BestPossible_bracket$data = {
  readonly bestPossibleFinish: number | null;
  readonly eliminated: boolean;
  readonly " $fragmentType": "BestPossible_bracket";
};
export type BestPossible_bracket$key = {
  readonly " $data"?: BestPossible_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"BestPossible_bracket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BestPossible_bracket",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bestPossibleFinish",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eliminated",
      "storageKey": null
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "614d37d9b78fbe5d8d716ee15317d63f";

export default node;
