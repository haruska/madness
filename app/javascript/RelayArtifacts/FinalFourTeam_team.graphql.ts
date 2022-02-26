/**
 * @generated SignedSource<<d31b5191c19cb77e64f1d1d25876a3d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FinalFourTeam_team$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "FinalFourTeam_team";
};
export type FinalFourTeam_team$key = {
  readonly " $data"?: FinalFourTeam_team$data;
  readonly " $fragmentSpreads": FragmentRefs<"FinalFourTeam_team">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FinalFourTeam_team",
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
    }
  ],
  "type": "Team",
  "abstractKey": null
};

(node as any).hash = "efa8457b80475ce295036ba4eaefb7cd";

export default node;
