# react-native-bottom-toolbar

Bottom toolbar styled as in iOS, implemented in JS as a pure component. Highly configurable with text or icons from `react-native-vector-icons` and nested actions that display in ActionSheetIOS (iOS only). You can also render your own component as content. You can specify event handlers and easily disable (make grey) the items.

Breaking change in 3.0.0 - the actions and nested actions are now specified not as props passed to `BottomToolbar` but as its children, similar to `Picker` item in RN.

Breaking change in 2.0.0 - changed the signature of the onPress function

Breaking change in 1.0.0 - renamed the nested actions prop


### Installation & usage

`npm i react-native-bottom-toolbar --save`
or
`yarn add react-native-bottom-toolbar`

```
import BottomToolbar from 'react-native-bottom-toolbar'

        <BottomToolbar>
          <BottomToolbar.Action
            title="Edit"
            onPress={(index, propsOfThisAction) =>
              console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
          />
          <BottomToolbar.Action
            title="Copy ULR"
            onPress={(index, propsOfThisAction) =>
              console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
          />
          <BottomToolbar.Action
            title="Delete"
            onPress={(index, propsOfThisAction) =>
              console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
          />
        </BottomToolbar>
```
<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/one.png" width="500" />

### Configuration

The components accepts these props:

```
BottomToolbar.propTypes = {
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
   * receives (index: number, actionProps: Object)
   * */
  onPress: PropTypes.func,
  /*
   * custom styles
   * */
  wrapperStyle: PropTypes.object,
  textStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  color: PropTypes.string,
  disabledColor: PropTypes.string,
  showIf: PropTypes.bool,

  /*
   * a function that accepts (childProps, index) and returns a component that will be rendered in the toolbar
   * use this to render you custom content
   * */
  customRenderer: PropTypes.func,

  children: PropTypes.any.isRequired,
};

Action.propTypes = {
  /*
   * the actions:
   * if onPress, size, color, font are provided in the action, they override the ones passed to the component
   * */
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  color: PropTypes.string,
  font: PropTypes.string,
  size: PropTypes.number,

  /*
   * for the nested actions that are displayed in an ActionSheet:
   * */
  actionSheetTitle: PropTypes.string,
  actionSheetMessage: PropTypes.string,
};

NestedAction.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOf(['cancel', 'destructive']),
};
```


The `onPress` function can be specified on three different levels: you may pass it as a prop to the component itself (see the first example), you may include it in the `BottomToolbar.Action` (see the first example), or may include it in the `BottomToolbar.NestedAction` (see the second example).

The function has to be specified on at least one level. You may combine the levels together - the `onPress` of a `BottomToolbar.NestedAction` overrides the `onPress` of an `BottomToolbar.Action`, and the `onPress` of a `BottomToolbar.Action` overrides the `onPress` of the component. This gives you a lot of flexibility - you can have one event handler for all actions and nested actions, or you can specify the handlers separately. The `onPress` function always receives the `action` / `nested action` it was triggered from, so you can easily distinguish the event source.

I suggest you pick an approach that works best for a given scenario and stick with it so you keep you code easy to understand.


### Examples

```
<BottomToolbar onPress={this.onToolbarPress}>
  <BottomToolbar.Action
    title="Mark All"
    iconName="ios-done-all-outline"
    size={37}
    myImportantObject="wow"
  />
  <BottomToolbar.Action
    title="Edit"
    iconName="pencil"
    font="simple"
    size={15}
    myImportantObject="wow2"
    onPress={(index: number, actionProps: Object) => {
      console.warn(`overriden press ${index} with ${actionProps.myImportantObject}`);
    }}
  />
  <BottomToolbar.Action
    title="Delete"
    iconName="ios-trash-outline"
    myImportantObject="wow3"
  />
  <BottomToolbar.Action
    title="Download"
    iconName="ios-download-outline"
    myImportantObject="wow4"
  />
</BottomToolbar>

onToolbarPress = (index: number, actionProps: Object) => {
  console.warn(`pressed ${index} with ${actionProps.myImportantObject}`);
  // prints `pressed 0 with wow` for the `Mark All` action
};
```
<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/two.png" width="500" />


You can also use nested actions, in which case they will be displayed in ActionSheetIOS.

```
  <BottomToolbar onPress={this.onToolbarPress}>
          <BottomToolbar.Action title="More">
            <BottomToolbar.NestedAction title="Analyze" />
            <BottomToolbar.NestedAction title="Delete" style="destructive" />
            <BottomToolbar.NestedAction
              title="Cancel"
              style="cancel"
              onPress={(index: number, actionPressed: Object) => {
                // overrides onToolbarPress
                console.warn(`pressed ${index} with title ${actionPressed.title}`);
              }}
            />
          </BottomToolbar.Action>
        </BottomToolbar>
```

<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/three.png" width="500" />


### Defaults:

color: '#007AFF',
font: 'ionicons',
size: 28

### License

MIT