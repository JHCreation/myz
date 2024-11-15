import { transform } from "lodash";

export const animation= {
  keyframes: {
    fadein: {
      "0%": {
        opacity: "0.5",
      },
      "100%": {
        opacity: "1",
      },
    },
    fadeout: {
      "0%": {
        opacity: "1",
      },
      "100%": {
        opacity: "0",
      },
    },
    jump: {
      "0%, 100%": {
        transform:" scale(1)"
      },
      "10%": {
        transform:" scale(.95)"
      },
      "50%": {
        transform:" scale(1.05)"
      },
    },
    appear: {
      "0%": { transform: "scale(.9)" },
      "100%": { transform: "scale(1)" },
    },
    disappear: {
      "0%": { transform: "scale(1)" },
      "100%": { transform: "scale(.9)" },
    },
    paging: {
      "0%": { transform: "scaleY(0)", transformOrigin: "50% 100%" },
      "50%": { transform: "scaleY(1)", transformOrigin: "50% 100%" },
      "70%": { transform: "scaleY(1)", transformOrigin: "50% 0%" },
      "100%": { transform: "scaleY(0)", transformOrigin: "50% 0%" },
      /* "0%": { height: "0%", transformOrigin: "50% 100%" },
      "50%": { height: "100%", transformOrigin: "50% 100%" },
      "70%": { height: "100%", transformOrigin: "50% 0%" },
      "100%": { height: "0%", transformOrigin: "50% 0%" }, */
    },
  },
  
  animation: {
    fadein: "fadein .3s forwards",
    fadeout: "fadeout .3s forwards",
    appear: "appear .2s forwards",
    disappear: "disappear .2s forwards",
    jump: "jump 0.5s both",
    paging: "paging 1.5s forwards",
  },
}