// @flow
import _ from 'lodash';
import * as React from 'react';
import bind from 'bind-decorator';
import bcrypt from 'react-native-bcrypt';
import { Animated, StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';

type Props = {};

type State = {
  simulateCPUUsage: boolean,
  showLongList: boolean,
};

const IMAGE_HEIGHT = 250;
const MENU_HEIGHT = 40;
const COLLAPSE_HEADER_HEIGHT = 70;

export default class Parallax2 extends React.Component<Props, State> {
  scrollAnimatedValue: Animated.Value;
  cpuInterval: IntervalID;

  constructor(props: Props) {
    super(props);

    this.scrollAnimatedValue = new Animated.Value(0);

    this.state = {
      simulateCPUUsage: false,
      showLongList: true,
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

  @bind
  handlePressListLengthToggle() {
    this.setState(prevState => ({
      showLongList: !prevState.showLongList,
    }));
  }

  render() {
    const { simulateCPUUsage, showLongList } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.header, {
            transform: [{
              translateY: this.scrollAnimatedValue.interpolate({
                inputRange: [0, IMAGE_HEIGHT],
                outputRange: [0, -38],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }],
          }]}
        >
          <Animated.Text
            style={[styles.headerCaption, {
              opacity: this.scrollAnimatedValue.interpolate({
                inputRange: [0, IMAGE_HEIGHT / 2],
                outputRange: [1.0, 0.0],
              }),
              transform: [{
                translateY: this.scrollAnimatedValue.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, 15],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            }]}
          >
            PICKUP FROM 11:00 - 12:00
          </Animated.Text>
          <Animated.Text
            style={[styles.headerTitle, {
              transform: [{
                scale: this.scrollAnimatedValue.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [1.0, 0.6],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }, {
                translateY: this.scrollAnimatedValue.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, 32],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            }]}
          >
            Awesome Shop
          </Animated.Text>
          <Animated.Text
            style={[styles.headerSubtext, {
              opacity: this.scrollAnimatedValue.interpolate({
                inputRange: [0, IMAGE_HEIGHT / 2],
                outputRange: [1.0, 0.0],
              }),
              transform: [{
                translateY: this.scrollAnimatedValue.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, 15],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            }]}
          >
            Awesome shop, awesome food
          </Animated.Text>
        </Animated.View>

        <Animated.View
          style={[styles.imageMenuContainer, {
            transform: [{
              translateY: this.scrollAnimatedValue.interpolate({
                inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, ],
                outputRange: [(IMAGE_HEIGHT - COLLAPSE_HEADER_HEIGHT), 0, -(IMAGE_HEIGHT - COLLAPSE_HEADER_HEIGHT)],
                extrapolateRight: 'clamp',
              }),
            }],
          }]}
        >
          <Animated.Image
            style={[styles.image, {
              transform: [{
                scale: this.scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0],
                  outputRange: [1.5, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            }]}
            source={{
              uri: 'https://antholagroup.com/sg/wp-content/uploads/2017/02/Palawan.jpg',
            }}
            />

          <View style={styles.menu}>
            <Text style={styles.category}>DRINKS</Text>
            <Text style={styles.category}>SPECIALS</Text>
            <Text style={styles.category}>SANDWICHES</Text>
            <Text style={styles.category}>CURRY</Text>
            <Text style={styles.category}>RAMEN</Text>
          </View>
        </Animated.View>

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
            <TouchableOpacity
              style={styles.button}
              onPress={this.handlePressCPU}
              >
              <Text>
                {(simulateCPUUsage ? 'Stop CPU usage' : 'Simulate CPU usage')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={this.handlePressListLengthToggle}
            >
              <Text>
                {(showLongList ? 'Short list' : 'Long list')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item} />

          {showLongList &&
            <React.Fragment>
              {_.range(25).map(key => (
                <View key={key} style={styles.item} />
              ))}
            </React.Fragment>
          }
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
    marginTop: IMAGE_HEIGHT + MENU_HEIGHT,
    paddingBottom: IMAGE_HEIGHT + MENU_HEIGHT + 10,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#ffffff',
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 20,
    paddingTop: 20 + 10, // iOS status bar + some more
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerCaption: {
    fontSize: 10,
  },
  headerTitle: {
    fontSize: 26,
    marginVertical: 5,
    fontWeight: '500',
  },
  headerSubtext: {
    fontSize: 12,
    fontWeight: '400',
  },
  imageMenuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: IMAGE_HEIGHT + MENU_HEIGHT,
    alignSelf: 'center',
  },
  image: {
    height: IMAGE_HEIGHT,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MENU_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#efe6dd',
  },
  category: {
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    marginVertical: 10,
  },
  item: {
    height: 100,
    borderRadius: 5,
    backgroundColor: '#f3dfa2',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
