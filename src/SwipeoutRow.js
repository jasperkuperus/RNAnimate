// @flow
import * as React from 'react';
import {
  StyleSheet, Animated, View, PanResponder, TouchableOpacity, Image, Text,
} from 'react-native';
import trashImage from '../assets/images/trash.png';

type Props = {
  person: {
    id: number,
    name: string,
  },
};

type State = {
  isOpen: boolean,
};

export default class SwipeoutRow extends React.Component<Props, State> {
  panXAnimatedValue: Animated.Value = new Animated.Value(0);

  panResponder: PanResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return false;
    },
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      return false;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 4;
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 4;
    },

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!

      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: Animated.event([
      null, // Ignore raw event argument
      { dx: this.panXAnimatedValue },
    ]),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      this.finishAnimation();
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      this.finishAnimation();
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    // this.panXAnimatedValue.addListener((event) => {
    //   console.log('Hi', this.state.isOpen, event);
    // });
  }

  finishAnimation() {
    if (this.state.isOpen) {
      Animated.timing(this.panXAnimatedValue, {
        toValue: 75,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.panXAnimatedValue, {
        toValue: -75,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    setTimeout(() => {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen,
      }));
    }, 250);
  }

  render() {
    const { person } = this.props;
    const { isOpen } = this.state;

    return (
      <View key={person.id}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.rowButtonContainer, !isOpen && {
            transform: [{
              translateX: this.panXAnimatedValue.interpolate({
                inputRange: [-75, 0],
                outputRange: [-75, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            }],
          }, isOpen && {
            transform: [{
              translateX: this.panXAnimatedValue.interpolate({
                inputRange: [0, 75],
                outputRange: [-75, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            }],
          }]}
        >
          <TouchableOpacity style={styles.rowButton}>
            <Text>{person.name}</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.swipeout}>
          <Image style={styles.trashImage} source={trashImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowButtonContainer: {
    zIndex: 50,
    backgroundColor: 'white',
  },
  rowButton: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  swipeout: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    bottom: 0,
    width: 75,
    backgroundColor: 'rgba(255, 0, 0, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashImage: {
    width: 22,
    height: 22,
  },
});
