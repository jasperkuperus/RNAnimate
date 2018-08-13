// @flow
import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import SwipeoutRow from './SwipeoutRow';
import type { Person } from './App';

type Props = {
  names: string[],
};

type State = {
  people: Person[],
};

export default class Swipeout extends React.Component<Props, State> {
  flatListElement: ?FlatList<Person> = null;

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
          ref={(element) => this.flatListElement = element}
          data={people}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <SwipeoutRow person={item} scrollView={this.flatListElement} />
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
});
