// @flow
import * as React from 'react';
import bcrypt from 'react-native-bcrypt';
import bind from 'bind-decorator';
import { Animated, StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';

type Props = {};

type State = {
  simulateCPUUsage: boolean,
};

const IMAGE_HEIGHT = 250;

export default class Parallax extends React.Component<Props, State> {
  scrollAnimatedValue: Animated.Value;
  cpuInterval: IntervalID;

  constructor(props: Props) {
    super(props);

    this.scrollAnimatedValue = new Animated.Value(0);

    this.state = {
      simulateCPUUsage: false,
    };
  }

  @bind
  handlePressCPU() {
    if (this.state.simulateCPUUsage) {
      clearInterval(this.cpuInterval);
    } else {
      this.cpuInterval = setInterval(() => {
        requestAnimationFrame(() => {
          bcrypt.hashSync('MyText', 10);
        });
      }, 10);
    }

    this.setState(prevState => ({
      simulateCPUUsage: !prevState.simulateCPUUsage,
    }));
  }

  render() {
    const { simulateCPUUsage } = this.state;

    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, {
            transform: [{
              translateY: this.scrollAnimatedValue.interpolate({
                inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
              })
            }, {
              scale: this.scrollAnimatedValue.interpolate({
                inputRange: [-IMAGE_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
              })
            }],
          }]}
          source={{
            uri: 'https://www.switchbacktravel.com/sites/default/files/images/articles/Los%20Glaciares%20Patagonia.jpg',
          }}
        />

        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }],
            {
              useNativeDriver: true,
            }
          )}
          scrollEventThrottle={8}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handlePressCPU}>
              <Text>
                {(simulateCPUUsage ? 'Stop CPU usage' : 'Simulate CPU usage')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    marginTop: IMAGE_HEIGHT,
    paddingBottom: IMAGE_HEIGHT + 10,
    backgroundColor: 'white',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    height: 100,
    borderRadius: 5,
    backgroundColor: '#f3dfa2',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
