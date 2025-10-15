import { proxy } from "valtio";
// import whiteTexture from "./textures/whitetxture.jpg";

export const state = proxy({
  color: [], // Array to store colors for each part
  texture: [], // Array to store textures for each part
});

export const setPartColor = (partIndex, color) => {
  state.color[partIndex] = color;
  state.texture[partIndex] = null;
};

export const setPartTexture = (partIndex: any, texture: any) => {
  state.texture[partIndex] = texture;
  state.color[partIndex] = "#ffffff";
};
