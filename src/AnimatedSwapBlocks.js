// @flow
import * as React from 'react';
import bind from 'bind-decorator';
import { LayoutAnimation, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type Props = {
  colors: ColorLookup,
};

type State = {
  blocks: string[],
};

export default class AnimatedSwapBlocks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      blocks: Object.keys(props.colors),
    };
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 250,
    });
  }

  @bind
  handleSwapItems() {
    const newBlocks = this.state.blocks;
    const temp = newBlocks[0];
    newBlocks[0] = newBlocks[3];
    newBlocks[3] = temp;

    this.setState({
      blocks: newBlocks,
    });
  }

  render() {
    const { colors } = this.props;
    const { blocks } = this.state;
    console.log(colors, blocks)

    return (
      <View style={styles.container}>
        {blocks.map(key => (
          <View
            key={key}
            style={{
              width: 100,
              height: 20,
              backgroundColor: colors[key],
            }}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={this.handleSwapItems}>
          <Text>
            Swap items
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 25,
  },
});
