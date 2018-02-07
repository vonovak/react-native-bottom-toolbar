import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import BottomToolbar from 'react-native-bottom-toolbar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export class UsageWithBottomSheet extends React.Component {
  static navigationOptions = {
    title: 'Bottom Sheet Usage',
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
        <View style={styles.container} />

        <BottomToolbar>
          <BottomToolbar.Action
            title="Edit"
            IconElement={<MaterialIcons name="edit" color="blue" />}
            onPress={(index, propsOfThisAction) => alert(index + ' ' + propsOfThisAction.title)}
          />
          <BottomToolbar.Action
            title="Copy"
            IconElement={<Ionicons name="ios-copy-outline" color="orange" size={22} />}
            onPress={(index, propsOfThisAction) => alert(index + ' ' + propsOfThisAction.title)}
          />
          <BottomToolbar.Action title="More">
            <BottomToolbar.NestedAction
              title="Delete"
              style="destructive"
              onPress={(index: number, actionPressed: Object) => {
                alert(`pressed ${index} with title ${actionPressed.title}`);
              }}
            />

            <BottomToolbar.NestedAction
              title="Cancel"
              style="cancel"
              onPress={(index: number, actionPressed: Object) => {
                alert(`pressed ${index} with title ${actionPressed.title}`);
              }}
            />
          </BottomToolbar.Action>
        </BottomToolbar>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
