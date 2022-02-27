/**
 * @generated SignedSource<<2df4e8e97206555b64f7587a9f50a13f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FinalFourTeamSmall_team$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "FinalFourTeamSmall_team";
};
export type FinalFourTeamSmall_team$key = {
  readonly " $data"?: FinalFourTeamSmall_team$data;
  readonly " $fragmentSpreads": FragmentRefs<"FinalFourTeamSmall_team">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FinalFourTeamSmall_team",
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

(node as any).hash = "81ad7d2fd82475691a7e1d26c9a92dda";

export default node;
