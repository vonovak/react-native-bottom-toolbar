import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomToolbar from '../bottomToolbar'
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageWithIcons extends React.Component {
    static navigationOptions = {
        title: 'Usage With Icons',
      };

    render() {
      return (
        <View style={styles.container}>
           <Button onPress={() => this.props.navigation.navigate('UsageCustom')} title="Custom Usage" />

           <BottomToolbar IconComponent={Ionicons} color="red">
            <BottomToolbar.Action
              title="Create"
              iconName="ios-create-outline"
              onPress={(index, propsOfThisAction) =>
                console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
            />
            <BottomToolbar.Action
              title="Copy"
              iconName="ios-copy-outline"
              IconElement={<Ionicons name="ios-copy-outline" color="orange" />}
              onPress={(index, propsOfThisAction) =>
                console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
            />
            <BottomToolbar.Action
              title="Delete"
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
  