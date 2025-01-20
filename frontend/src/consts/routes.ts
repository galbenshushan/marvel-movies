import { RoutesLabels, RoutesPaths } from "../enums/router";

export const navButtons = [
  { label: RoutesLabels.HOME, path: RoutesPaths.HOME },
  {
    label: RoutesLabels.CHARACTERS_WITH_MULTIPLE_ACTORS,
    path: RoutesPaths.CHARACTERS_WITH_MULTIPLE_ACTORS,
  },
  {
    label: RoutesLabels.ACTORS_WITH_MULTIPLE_CHARACTERS,
    path: RoutesPaths.ACTORS_WITH_MULTIPLE_CHARACTERS,
  },
  {
    label: RoutesLabels.MOVIES_PER_ACTOR,
    path: RoutesPaths.MOVIES_PER_ACTOR,
  },
];
