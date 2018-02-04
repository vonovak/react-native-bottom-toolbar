import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomToolbar from '../bottomToolbar'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export class UsageWithBottomSheet extends React.Component {
    static navigationOptions = {
        title: 'Bottom Sheet Usage',
      };
    render() {
      return (
        <View style={styles.container}>
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
              title="More"
            >
               <BottomToolbar.NestedAction title="Delete" style="destructive" />

                <BottomToolbar.NestedAction
              title="Cancel"
              style="cancel"
              onPress={(index: number, actionPressed: Object) => {
                console.warn(`pressed ${index} with title ${actionPressed.title}`);
              }}
            />
            </BottomToolbar.Action>
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
  