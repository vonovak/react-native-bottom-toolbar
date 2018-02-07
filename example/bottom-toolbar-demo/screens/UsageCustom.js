import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import BottomToolbar from 'react-native-bottom-toolbar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageCustom extends React.Component {
  static navigationOptions = {
    title: 'Usage with Text',
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.navigate('UsageWithBottomSheet')}
            title="Action Sheet Usage"
          />
        </View>
        <BottomToolbar>
          <BottomToolbar.Action
            title="Edit"
            onPress={(index, propsOfThisAction) =>
              alert(index + ' ' + JSON.stringify(propsOfThisAction))
            }
          />
          <BottomToolbar.Action
            title="Copy ULR"
            onPress={(index, propsOfThisAction) =>
              alert(index + ' ' + JSON.stringify(propsOfThisAction))
            }
          />
          <BottomToolbar.Action
            title="Delete"
            onPress={(index, propsOfThisAction) =>
              alert(index + ' ' + JSON.stringify(propsOfThisAction))
            }
          />
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
