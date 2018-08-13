// @flow
import React, { Component } from 'react';
import { bind } from 'bind-decorator';
import { LayoutAnimation, Platform, StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import AnimatedSwapBlocks from './AnimatedSwapBlocks';
import AnimatedBarChart from './AnimatedBarChart';
import Parallax from './Parallax';
import Parallax2 from './Parallax2';
import Swipeout from './Swipeout';
import Menu from './Menu';

export type Person = {
  id: number,
  name: string,
};

const colors = {
  black: '#231f20',
  red: '#bb4430',
  blue: '#7ebdc2',
  yellow: '#f3dfa2',
  grey: '#efe6dd',
};

const names = [
  'Jody Britain', 'Nestor Riegel', 'Huey Tardugno', 'Ivana Massingill',
  'Dollie Rappaport', 'Babette Kall', 'Leonila Wellman', 'Clifton Sturm',
  'Lorelei Greenley', 'Livia Arriaga', 'Jamar Whitfield', 'Rosina Seegmiller',
  'Rosemarie Mcninch', 'Dorene Mcbroom', 'Belia Gillmore', 'Evelina Jeremiah',
  'Ruthe Desjardins', 'Titus Bomberger', 'Epifania Leffew', 'Chanel Curro',
  'Neida Stracener', 'Elenor Wasser', 'Juli Kimbro', 'Carmelina Chism',
  'Dianne Vaughan', 'Jacqueline Antonelli', 'Billi Zakrzewski',
  'Lakiesha Latimer', 'Tiffanie Babst', 'Loria Desanto'
];

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
          {(view === 'bar-chart' || view.indexOf('dummy') === 0) &&
            <AnimatedBarChart colors={colors} />
          }

          {view === 'block-swap' &&
            <AnimatedSwapBlocks colors={colors} />
          }

          {view === 'parallax' &&
            <Parallax />
          }

          {view === 'parallax-2' &&
            <Parallax2 />
          }

          {view === 'swipeout' &&
            <Swipeout names={names} />
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
