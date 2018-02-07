import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button } from 'react-native';
import BottomToolbar from 'react-native-bottom-toolbar';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageWithIcons extends React.Component {
  static navigationOptions = {
    title: 'Usage With Icons',
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.navigate('UsageCustom')}
            title="Usage With Text"
          />
        </View>
        <BottomToolbar IconComponent={Ionicons} color="red">
          <BottomToolbar.Action
            title="Create"
            iconName="ios-create-outline"
            onPress={(index, propsOfThisAction) =>
              alert(index + ' ' + JSON.stringify(propsOfThisAction))
            }
          />
          <BottomToolbar.Action
            title="Copy"
            iconName="ios-copy-outline"
            IconElement={<Ionicons name="ios-copy-outline" color="orange" size={25} />}
            onPress={(index, propsOfThisAction) =>
              alert(index + ' and title: ' + propsOfThisAction.title)
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
