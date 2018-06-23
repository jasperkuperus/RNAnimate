// @flow
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type Props = {
  text: string,
  active: boolean,
  onPress: Function,
};

export default function MenuButton(props: Props) {
  const { text, active, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, active && styles.activeText]}>
        {text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
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
