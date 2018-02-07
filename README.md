# react-native-bottom-toolbar

Bottom toolbar styled as in iOS, implemented in JS as a PureComponent, typed with Flow. Highly configurable with text or icons from `react-native-vector-icons` and nested actions that display in ActionSheetIOS (iOS only). You can also render your own component as content.

Breaking changes in 4.0.0: `color` now applies to both icons and text, `size` was renamed to `iconSize`, `font` was removed, the package now does not have any dependencies, `customRenderer` was replaced with `IconElement` prop.

Breaking change in 3.0.0 - the actions and nested actions are now specified not as props passed to `BottomToolbar` but as its children, similar to `Picker` item in RN.

### Expo demo

[here](https://expo.io/@vonovak/bottom-toolbar-demo), code for the demo is in the `example` folder

### Installation & usage

`npm i react-native-bottom-toolbar`
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

<img src="https://raw.githubusercontent.com/vonovak/react-native-bottom-toolbar/master/example/one.png" width="500" />

### Configuration

The component accepts these props:

```
BottomToolbar.propTypes = {
  /*
     * component from react-native-vector icons
     * */
  IconComponent: PropTypes.func,
  iconSize: PropTypes.number,
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
  children: PropTypes.any.isRequired,
};

Action.propTypes = {
  /*
     * the actions:
     * if onPress, size, color, font are provided in the action, they override the ones passed to BottomToolbar
     * */
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  color: PropTypes.string,
  iconSize: PropTypes.number,
  IconElement: PropTypes.object,

  /*
     * for the nested actions that are displayed in ActionSheetIOS:
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

### License

MIT
