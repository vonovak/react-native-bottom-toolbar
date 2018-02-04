import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomToolbar from '../bottomToolbar'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageCustom extends React.Component {
    static navigationOptions = {
        title: 'Custom Usage',
      };
    render() {
      return (
        <View style={styles.container}>
                   <Button onPress={() => this.props.navigation.navigate('UsageWithBottomSheet')} title="Action Sheet Usage" />

           <BottomToolbar >
            <BottomToolbar.Action
              title="Edit"
              IconElement={<MaterialIcons name="edit" color="blue" />}
              onPress={(index, propsOfThisAction) =>
                console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
            />
            <BottomToolbar.Action
              title="Copy"
              IconElement={<Ionicons name="ios-copy-outline" color="orange" />}
              onPress={(index, propsOfThisAction) =>
                console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
            />
            <BottomToolbar.Action
              title="Delete"
              color="green"
              onPress={(index, propsOfThisAction) =>
                console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
            />
          </BottomToolbar>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  