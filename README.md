# react-native-bottom-toolbar

Bottom toolbar styled as in iOS, implemented in JS as a pure component. Configurable with text or icons from `react-native-vector-icons`.


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


```
{Platform.isIos && <BottomToolbar // from react-native-platforms 
    onPress={this.onToolbarPress}
    actions={
        [
            {title: 'Mark All', iconName: 'ios-done-all-outline', size: 37,
            {title: 'Edit', iconName: 'pencil', font: 'simple', size: 15,
            {title: 'Delete', iconName: 'ios-trash-outline',
            {title: 'Download', iconName: 'ios-download-outline'},
        ]
    }
/>}
```
<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/two.png" width="500" />


### Configuration:

The component accepts the following props:

```
propTypes = {
    /*
    * font family from react-native-vector icons
    * */
    font: PropTypes.string,

    /*
    * icon size
    * */
    size: PropTypes.number,
    
    
    /*
    * onPress for handling icon or text press
    * receives (index: number, title: string, id: ?string)
    * */
    onPress: PropTypes.func,
    
    /*
     * custom styles
     * */
    wrapperStyle: PropTypes.object,
    textStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    color: PropTypes.string,

    /*
    * if onPress, size, color, font are provided in the action,
    * they override the ones passed directly to the component
    * */
    actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        iconName: PropTypes.string,
        /*
        * custom identifier if needed
        * */
        id: PropTypes.string,
        onPress: PropTypes.func,
        color: PropTypes.string,
        font: PropTypes.string,
        size: PropTypes.number,
    })),
}
```

### Defaults:

color: '#007AFF',
font: 'ionicons',
size: 25

### License
MIT
