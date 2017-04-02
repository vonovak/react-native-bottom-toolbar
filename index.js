/*
 * @flow
 * */
import React, {Component, PropTypes} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActionSheetIOS,
} from 'react-native';

type ActionType = Object

const renderIcon = (font: string, name: string, size: number, color: string) => {
    switch (font) {
        case 'ionicons':
            return <IoniconIcon name={name} size={size} color={color}/>;
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

const BottomToolbar = ({actions, onPress, font, size, color, textStyle, buttonStyle, wrapperStyle, disabledColor, showIf}) => {
    return showIf ? (
        <View style={[styles.wrapper, wrapperStyle]}>
            <View style={styles.columnWrap}>
                {
                    actions.map((action: ActionType, index: number) => {
                        if (action.hidden) {
                            return null
                        }
                        const fnc = () => showActionSheet(action, onPress)
                        const onActionPress = (action.nestedActions && fnc) || action.onPress || onPress;
                        const disabled = isDisabled(action)
                        const iconColor = disabled ? disabledColor : action.color || color

                        const content = action.iconName ?
                            renderIcon(action.font || font, action.iconName, action.size || size, iconColor)
                            : <Text style={[styles.text, disabled && {color: disabledColor}, textStyle]}>{action.title}</Text>

                        const Element = disabled ? View : TouchableOpacity
                        return (
                            <Element
                                style={[styles.buttonDefaults, buttonStyle]}
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

export default BottomToolbar;

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
}

BottomToolbar.defaultProps = {
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
}

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
    }
});
