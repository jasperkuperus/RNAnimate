// @flow
import * as React from 'react';
import {
  Dimensions, StyleSheet, ScrollView, View, TouchableOpacity, Text,
} from 'react-native';
import MenuButton from './MenuButton';

type Props = {
  onStateChange: Function,
};

type State = {
  selected: string,
};

export default class Menu extends React.Component<Props, State> {
  scrollView: ScrollView;
  scrollViewWidth: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: 'bar-chart',
    };
  }

  handlePress(newState: string, buttonRef: Object) {
    this.setState({
      selected: newState,
    });

    const { width } = Dimensions.get('window');
    buttonRef.measure((buttonX, y, buttonWidth) => {
      const max = this.scrollViewWidth - width;
      const position = (-1 * (width / 2)) + (buttonWidth / 2) + buttonX;
      const x = Math.min(Math.max(0, position), max);
      this.scrollView.scrollTo({ x });
    })

    if (this.props.onStateChange) {
      this.props.onStateChange(newState);
    }
  }

  render() {
    const { selected } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ref={(element) => this.scrollView = element}
        onContentSizeChange={(width) => this.scrollViewWidth = width}
        horizontal={true}
      >
        <MenuButton
          text="Bar Chart"
          active={selected === 'bar-chart'}
          onPress={(buttonRef) => this.handlePress('bar-chart', buttonRef)}
        />

        <MenuButton
          text="Block Swap"
          active={selected === 'block-swap'}
          onPress={(buttonRef) => this.handlePress('block-swap', buttonRef)}
        />

        <MenuButton
          text="Parallax"
          active={selected === 'parallax'}
          onPress={(buttonRef) => this.handlePress('parallax', buttonRef)}
        />

        <MenuButton
          text="Parallax 2"
          active={selected === 'parallax-2'}
          onPress={(buttonRef) => this.handlePress('parallax-2', buttonRef)}
          />

        <MenuButton
          text="Swipeout"
          active={selected === 'swipeout'}
          onPress={(buttonRef) => this.handlePress('swipeout', buttonRef)}
          />

        <MenuButton
          text="Drinks"
          active={selected === 'dummy-2'}
          last={true}
          onPress={(buttonRef) => this.handlePress('dummy-2', buttonRef)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexGrow: 0,
    backgroundColor: '#efe6dd',
  },
  contentContainer: {
    alignItems: 'center',
  },
})
