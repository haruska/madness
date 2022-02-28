/**
 * @generated SignedSource<<438c3dec3804a4d6cec0bf676f150503>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BestPossibleSmall_bracket$data = {
  readonly bestPossibleFinish: number | null;
  readonly eliminated: boolean;
  readonly " $fragmentType": "BestPossibleSmall_bracket";
};
export type BestPossibleSmall_bracket$key = {
  readonly " $data"?: BestPossibleSmall_bracket$data;
  readonly " $fragmentSpreads": FragmentRefs<"BestPossibleSmall_bracket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BestPossibleSmall_bracket",
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

(node as any).hash = "61fe451deff1cb5e9209279131df7497";

export default node;
