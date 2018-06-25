// @flow
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MenuButton from './MenuButton';

type Props = {
  onStateChange: Function,
};

type State = {
  selected: string,
};

export default class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: 'bar-chart',
    };
  }

  handlePress(newState: string) {
    this.setState({
      selected: newState,
    });

    this.props.onStateChange(newState);
  }

  render() {
    const { selected } = this.state;

    return (
      <View style={styles.container}>
        <MenuButton
          text="Bar Chart"
          active={selected === 'bar-chart'}
          onPress={() => this.handlePress('bar-chart')}
        />

        <MenuButton
          text="Block Swap"
          active={selected === 'block-swap'}
          onPress={() => this.handlePress('block-swap')}
        />

        <MenuButton
          text="Parallax"
          active={selected === 'parallax'}
          onPress={() => this.handlePress('parallax')}
        />

        <MenuButton
          text="Parallax 2"
          active={selected === 'parallax-2'}
          last={true}
          onPress={() => this.handlePress('parallax-2')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#efe6dd',
  },
})
