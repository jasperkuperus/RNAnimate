// @flow
import React, { Component } from 'react';
import { bind } from 'bind-decorator';
import { LayoutAnimation, Platform, StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import AnimatedSwapBlocks from './AnimatedSwapBlocks';
import AnimatedBarChart from './AnimatedBarChart';
import Parallax from './Parallax';
import Menu from './Menu';

const colors = {
  black: '#231f20',
  red: '#bb4430',
  blue: '#7ebdc2',
  yellow: '#f3dfa2',
  grey: '#efe6dd',
};

type Props = {};

type State = {
  view: string,
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      view: 'bar-chart',
    };
  }

  @bind
  handleStateChange(newState: string) {
    this.setState({
      view: newState,
    })
  }

  render() {
    const { view } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {view === 'bar-chart' &&
            <AnimatedBarChart colors={colors} />
          }

          {view === 'block-swap' &&
            <AnimatedSwapBlocks colors={colors} />
          }

          {view === 'parallax' &&
            <Parallax />
          }
        </View>

        <Menu onStateChange={this.handleStateChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
