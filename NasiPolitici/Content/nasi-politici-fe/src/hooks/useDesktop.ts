import { useMediaQuery } from "@material-ui/core";
import { DEFAULT_THEME } from "../theme";

// breakpoint should be consumed from theme.
export const useDesktop = () => useMediaQuery(`@media screen and (min-width:${DEFAULT_THEME.breakpoints.values.sm}px)`);