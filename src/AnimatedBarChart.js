// @flow
import * as React from 'react';
import bind from 'bind-decorator';
import { Animated, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type Props = {
  colors: ColorLookup,
};

type State = {
  widths: Animated.Value[],
};

export default class AnimatedBarChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      widths: [0.25, 0.75, 0.53, 0.99, 0.13].map(width => new Animated.Value(width)),
    };
  }

  @bind
  handleGeneratePress() {
    Animated.parallel(this.state.widths.map(width => {
      return Animated.spring(width, {
        toValue: Math.random(),
      });
    })).start();
  }

  render() {
    const { colors } = this.props;
    const { widths } = this.state;

    return (
      <View style={styles.container}>
        {widths.map((width, index) => (
          <Animated.View
            key={index}
            style={[styles.bar, {
              backgroundColor: colors[Object.keys(colors)[index]],
              width: width.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 200],
              }),
            }]}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={this.handleGeneratePress}>
          <Text>
            Generate new values
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    margin: 5,
    borderRadius: 5,
    height: 10,
  },
  button: {
    marginTop: 25,
  },
});
