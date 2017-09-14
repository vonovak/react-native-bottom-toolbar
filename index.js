/*
 * @flow
 * */
import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { View, StyleSheet, TouchableOpacity, Text, ActionSheetIOS } from 'react-native';

// todo be more specific
type ActionType = Object;

class Action extends React.PureComponent {
  render() {
    return null;
  }
}

class NestedAction extends React.PureComponent {
  render() {
    return null;
  }
}

export default class BottomToolbar extends React.PureComponent {
  static Action = Action;
  static NestedAction = NestedAction;

  render() {
    const { onPress, buttonStyle, wrapperStyle, showIf, children } = this.props;

    if (!showIf) return null;

    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <View style={styles.columnWrap}>
          {React.Children.map(children, (child, index) => {
            if (!child) return null;

            const disabled = isDisabled(child);
            const Element = disabled ? View : TouchableOpacity;

            const childProps = child.props;
            const fnc = () => showActionSheet(child, onPress);
            const onActionPress = (childProps.children && fnc) || childProps.onPress || onPress;
            return (
              <Element
                style={[styles.buttonDefaults, buttonStyle]}
                key={`${child.title}`}
                onPress={() => onActionPress(index, childProps)}
              >
                {this.renderTabContent(childProps, disabled, index)}
              </Element>
            );
          })}
        </View>
      </View>
    );
  }

  renderTabContent(childProps: Object, disabled: boolean, index: number) {
    const { customRenderer } = this.props;

    if (customRenderer) {
      return customRenderer(childProps, index);
    } else if (childProps.iconName) {
      return this.renderIcon(childProps, disabled);
    } else {
      return this.renderText(childProps, disabled);
    }
  }

  renderIcon(childProps: Object, disabled: boolean) {
    const { font, size, color, disabledColor } = this.props;
    const Icon = getIconClass(childProps.font || font);

    return (
      <Icon
        name={childProps.iconName}
        size={childProps.size || size}
        color={disabled ? disabledColor : childProps.color || color}
      />
    );
  }

  renderText(childProps: Object, disabled: boolean) {
    const { textStyle, disabledColor } = this.props;
    return (
      <Text style={[styles.text, textStyle, disabled && { color: disabledColor }]}>
        {childProps.title}
      </Text>
    );
  }
}

const isDisabled = (child: ActionType): boolean => {
  const { children, disabled } = child.props;
  if (children) {
    const isOnlyCancelActionPresent =
      React.Children.toArray(children).find(nested => nested.props.style !== 'cancel') ===
      undefined;
    return isOnlyCancelActionPresent || disabled;
  } else {
    return disabled;
  }
};

const getIconClass = (font: string): ReactClass<*> => {
  switch (font) {
    case 'ionicons':
      return IoniconIcon;
    case 'material':
      return MaterialIcon;
    case 'font-awesome':
      return AwesomeIcon;
    case 'evil-icons':
      return EvilIcon;
    case 'simple':
      return SimpleIcon;
    case 'entypo':
      return EntypoIcon;
    case 'foundation':
      return FoundationIcon;
    case 'octicons':
      return OcticonIcon;
    case 'zocial':
      return ZocialIcon;
    default:
      return IoniconIcon;
  }
};

const showActionSheet = (
  child: ActionType,
  rootOnPress: (index: number, nestedAction: Object) => void
) => {
  let nestedChildren = React.Children.toArray(child.props.children);
  let options = nestedChildren.map(it => it.props.title);
  let styles = nestedChildren.map(it => it.props.style);
  let destructiveButtonIndex = styles.indexOf('destructive');
  let cancelButtonIndex = styles.indexOf('cancel');
  let title = child.props.actionSheetTitle;
  let message = child.props.actionSheetMessage;

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      title,
      message,
    },
    (buttonIndex: number) => {
      let fncToCall =
        nestedChildren[buttonIndex].props.onPress || child.props.onPress || rootOnPress;
      fncToCall(buttonIndex, nestedChildren[buttonIndex].props);
    }
  );
};

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

BottomToolbar.defaultProps = {
  color: '#007AFF',
  disabledColor: 'grey',
  font: 'ionicons',
  size: 28,
  onPress: (index: number, actionProps: ActionType) => {},
  wrapperStyle: undefined,
  showIf: true,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(245,245,245,1)',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    height: 43,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  columnWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#007AFF',
  },
  buttonDefaults: {
    paddingHorizontal: 15,
  },
});
