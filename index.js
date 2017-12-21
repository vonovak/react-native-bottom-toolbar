/*
* @flow
* */
import React, {Component} from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import OcticonIcon from 'react-native-vector-icons/Octicons'
import ZocialIcon from 'react-native-vector-icons/Zocial'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActionSheetIOS,
} from 'react-native'

type ActionType = Object

const isLandscape = () => {
  const dims = Dimensions.get('screen');
  return dims.width >= dims.height;
}

const renderIcon = (font: string, name: string, size: number, color: string) => {
  switch (font) {
    case 'ionicons':
    return <IoniconIcon name={name} size={size} color={color}/>;
    case 'material':
    return <MaterialIcon name={name} size={size} color={color}/>;
    case 'font-awesome':
    return <AwesomeIcon name={name} size={size} color={color}/>;
    case 'evil-icons':
    return <EvilIcon name={name} size={size} color={color}/>;
    case 'simple':
    return <SimpleIcon name={name} size={size} color={color}/>;
    case 'entypo':
    return <EntypoIcon name={name} size={size} color={color}/>;
    case 'foundation':
    return <FoundationIcon name={name} size={size} color={color}/>;
    case 'octicons':
    return <OcticonIcon name={name} size={size} color={color}/>;
    case 'zocial':
    return <ZocialIcon name={name} size={size} color={color}/>;
    default:
    return <IoniconIcon name={name} size={size} color={color}/>;
  }
}

const isDisabled = (action: ActionType): boolean => {
  if (action.nestedActions) {
    const allAreHidden = action.nestedActions.filter(it => (it.hidden !== true && it.style !== 'cancel')).length === 0
    return allAreHidden || action.disabled
  } else {
    return action.disabled
  }
}

const showActionSheet = (action: ActionType, rootOnPress: (index: number, nestedAction: Object) => void) => {
  let nestedActions = action.nestedActions.filter(it => it.hidden !== true)
  let options = nestedActions.map(it => it.title)
  let styles = nestedActions.map(it => it.style)
  let destrIndex = styles.indexOf('destructive')
  let cancelIndex = styles.indexOf('cancel')
  // todo warn if -1
  ActionSheetIOS.showActionSheetWithOptions({
    options,
    cancelButtonIndex: cancelIndex,
    destructiveButtonIndex: destrIndex,
    title: action.actionSheetTitle,
    message: action.actionSheetMessage,
  },
  (buttonIndex: number) => {
    let fncToCall = nestedActions[buttonIndex].onPress || action.onPress || rootOnPress
    fncToCall(buttonIndex, nestedActions[buttonIndex])
  });
};

class BottomToolbar extends Component {
  state = {
    orientationWrapperStyle: isLandscape() ? styles.wrapperLandscape : styles.wrapperPortrait,
    orientationColumnWrapStyle: isLandscape() ? styles.columnWrapLandscape : styles.columnWrapPortrait,
  }

  handler = dims => this.setState({
    orientationWrapperStyle: isLandscape() ? styles.wrapperLandscape : styles.wrapperPortrait,
    orientationColumnWrapStyle: isLandscape() ? styles.columnWrapLandscape : styles.columnWrapPortrait,
  });

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.handler);
  }

  static propTypes = {
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
    * receives (index: number, action: Object)
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
    * the actions:
    * if onPress, size, color, font are provided in the action, they override the ones passed to the component
    * */
    actions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      iconName: PropTypes.string,
      disabled: PropTypes.bool,
      hidden: PropTypes.bool,
      onPress: PropTypes.func,
      color: PropTypes.string,
      font: PropTypes.string,
      size: PropTypes.number,

      /*
      * for the nested actions that are displayed in an actionSheet:
      * */
      actionSheetTitle: PropTypes.string,
      actionSheetMessage: PropTypes.string,
      nestedActions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        hidden: PropTypes.bool,
        style: PropTypes.oneOf(['cancel', 'destructive']),
      })),
    })),
  };

  static defaultProps = {
    color: '#007AFF',
    disabledColor: "grey",
    font: 'ionicons',
    size: 28,
    onPress: (index: number, action: ActionType) => {
    },
    wrapperStyle: {},
    textStyle: {},
    buttonStyle: {},

    actionSheetTitle: null,
    actionSheetMessage: null,
    actions: [],
    showIf: true,
  };

  render(): React.Node {
    return this.props.showIf ? (
      <View style={[styles.wrapper, this.state.orientationWrapperStyle, this.props.wrapperStyle]}>
      <View style={[styles.columnWrap, this.state.orientationColumnWrapStyle]}>
      {
        this.props.actions.map((action: ActionType, index: number) => {
          if (action.hidden) {
            return null
          }
          const fnc = () => showActionSheet(this.props.action, this.props.onPress)
          const onActionPress = (action.nestedActions && fnc) || action.onPress || this.props.onPress;
          const disabled = isDisabled(action)
          const iconColor = this.props.disabled ? this.props.disabledColor : action.color || this.props.color

          var content;
          if(action.customContent) {
            content = action.customContent;
          } else if (action.iconName) {
            content = renderIcon(action.font || this.props.font, action.iconName, action.size || this.props.size, iconColor)
          } else {
            content = <Text style={[styles.text, this.props.disabled && {color: this.props.disabledColor}, this.props.textStyle]}>{action.title}</Text>
          }

          const Element = this.props.disabled ? View : TouchableOpacity
          return (
            <Element
            style={[styles.buttonDefaults, this.props.buttonStyle]}
            key={`${action.title}_${index}`}
            onPress={() => onActionPress(index, action)}
            >
            {content}
            </Element>
          );
        })
      }
      </View>
      </View>
    ) : null

  }
};

export default BottomToolbar;


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(245,245,245,1)',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  wrapperPortrait: {
    ...ifIphoneX({
      height: 83,
    }, {
      height: 43,
    }),
  },
  wrapperLandscape: {
    ...ifIphoneX({
      height: 53,
    }, {
      height: 43,
    }),
  },
  columnWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  columnWrapPortrait: {
    ...ifIphoneX({
      top: 13,
    }, {
      alignItems: 'center',
    }),
  },
  columnWrapLandscape: {
    ...ifIphoneX({
      top: 10,
    }, {
      alignItems: 'center',
    }),
  },
  text: {
    fontSize: 17,
    color: '#007AFF',
  },
  buttonDefaults: {
    paddingHorizontal: 15,
  }
});
