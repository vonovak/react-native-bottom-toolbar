import { UsageCustom, UsageWithIcons, UsageWithBottomSheet } from './screens';
import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  UsageWithIcons: {
    screen: UsageWithIcons,
  },
  UsageWithBottomSheet: {
    screen: UsageWithBottomSheet,
  },
  UsageCustom: {
    screen: UsageCustom,
  },
});
