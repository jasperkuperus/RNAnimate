// @flow
import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import trashImage from '../assets/images/trash.png';

type Props = {
  names: string[],
};

type State = {
  people: {
    id: number,
    name: string,
  }[],
};

export default class Swipeout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      people: props.names.map((name, index) => ({
        id: index,
        name,
      })),
    };
  }

  render() {
    const { people } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>People</Text>
        </View>

        <FlatList
          data={people}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View key={item.id}>
              <View style={styles.rowButtonContainer}>
                <TouchableOpacity style={styles.rowButton}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.swipeout}>
                <Image style={styles.trashImage} source={trashImage} />
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowButtonContainer: {
    zIndex: 50,
    backgroundColor: 'white',
  },
  rowButton: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    paddingTop: 20,
    height: 60,
    backgroundColor: '#f3dfa2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
  },
  separator: {
    backgroundColor: '#efe6dd',
    height: 1,
  },
  swipeout: {
    zIndex: 10,
    position: 'absolute',
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
