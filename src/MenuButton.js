// @flow
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type Props = {
  text: string,
  active: boolean,
  last?: boolean,
  onPress: Function,
};

export default function MenuButton(props: Props) {
  const { text, active, onPress, last } = props;

  let buttonRef = null;

  const buttonStyles = [styles.button]
  if (last) {
    buttonStyles.push({
      marginRight: 0,
    });
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      ref={(element) => buttonRef = element}
      onPress={() => onPress(buttonRef)}
    >
      <Text style={[styles.text, active && styles.activeText]}>
        {text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
  },
  activeButton: {
  },
  text: {
    fontSize: 12,
  },
  activeText: {
    fontWeight: '600',
  },
})
