import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const widthPercentageToDP = (percent: string | number) => {
  const parsed = typeof percent === "string" ? parseFloat(percent) : percent;
  return (SCREEN_WIDTH * parsed) / 100;
};
