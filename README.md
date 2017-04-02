# react-native-bottom-toolbar

Bottom toolbar styled as in iOS, implemented in JS as a pure component. Highly configurable with text or icons from `react-native-vector-icons` and nested actions that display in ActionSheetIOS (iOS only). 

Breaking change in 1.0.0 - renamed the nested actions prop

Breaking change in 2.0.0 - changed the signature of the onPress function


### Installation & usage

`npm i react-native-bottom-toolbar --save`

```
import BottomToolbar from 'react-native-bottom-toolbar'

<BottomToolbar
    actions={
        [
            // note the extra spaces needed for perfect alignment
            {title: 'Edit  ', onPress: ()=>gotoEditProject(...)}, 
            {title: 'Copy ULR', onPress: ()=>copyProjectUrl(...)},
            {title: 'Delete', onPress: ()=>deleteProj(...)},
        ]
    }
/>
```
<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/one.png" width="500" />

### Configuration:

The component accepts these [props](https://github.com/vonovak/react-native-bottom-toolbar/blob/master/index.js#L110).


### Examples

```
{Platform.isIos && <BottomToolbar // from react-native-platforms 
    onPress={this.onToolbarPress}
    actions={
        [
            {title: 'Mark All', iconName: 'ios-done-all-outline', size: 37, myImportantObject: 'wow' },
            {title: 'Edit', iconName: 'pencil', font: 'simple', size: 15, myImportantObject: 'wow2' },
            {title: 'Delete', iconName: 'ios-trash-outline', myImportantObject: 'wow3' },
            {title: 'Download', iconName: 'ios-download-outline', myImportantObject: 'wow4' },
        ]
    }
/>}

onToolbarPress = (index: number, actionPressed: Object) => {
    console.log(`pressed ${index} with ${actionPressed.myImportantObject}`)
    // prints `pressed 0 with wow` for the `Mark All` action
}
```
<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/two.png" width="500" />


You can also use nested actions, in which case they will be displayed in ActionSheetIOS.

```
const nestedActions = [
    {
        title: 'Analyze', onPress: (index: number, actionPressed: Object) => {
            console.log(`pressed ${index} with title ${actionPressed.title}`)
        }
    },
    {
        title: 'Delete', style: 'destructive', onPress: (index: number, actionPressed: Object) => {
            console.log(`pressed ${index} with title ${actionPressed.title}`)
        }
    },
    {
        title: 'Cancel', style: 'cancel', onPress: (index: number, actionPressed: Object) => {
            console.log(`pressed ${index} with title ${actionPressed.title}`)
        }
    }
]
        
<BottomToolbar 
    onPress={this.onToolbarPress}
    actions={
        [
            {title: 'Mark All', iconName: 'ios-done-all-outline', size: 37,}
            {title: 'Edit', iconName: 'pencil', font: 'simple', size: 15,}
            {title: 'Download', iconName: 'ios-download-outline'},
            {title: 'More', iconName: 'ios-albums-outline', nestedActions: nestedActions },
        ]
    }
/>}
```

<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/three.png" width="500" />


### Defaults:

color: '#007AFF',
font: 'ionicons',
size: 25

### License
MIT
