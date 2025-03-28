import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";
import React from "react";
import { darkColor, lightColor } from "../utils/color";

type Props = TextProps;

const StyledText = (props: Props) => {
  const isDark = useColorScheme() === "dark";

  const textColor = isDark ? lightColor : darkColor;
  const customStyle = props.style
    ? { ...StyleSheet.flatten(props.style), color: textColor }
    : { color: textColor };

  return <Text style={customStyle}>{props.children}</Text>;
};

export default StyledText;

const styles = StyleSheet.create({});
