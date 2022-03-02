/**
 * @generated SignedSource<<3d3ff4f52b3a0574a4702ab51e208e19>>
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
    }
  ],
  "type": "Bracket",
  "abstractKey": null
};

(node as any).hash = "c268774a27a495a0896da424a95e36f5";

export default node;
