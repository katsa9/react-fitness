import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator } from 'react-navigation-tabs' 
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import History from './components/History'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

const RouteConfigs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
};
// const RootStack = createStackNavigator(RouteConfigs);
// const AppContainer = createAppContainer(RootStack);

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
const AppContainer = createAppContainer(TabNavigator);

    function UdaciStatusBar ({backgroundColor, ...props}) {
      return (
        <View style={{ backgroundColor, height: 50 }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      )
    }

    const MainNavigator = createAppContainer(createStackNavigator({
      home: {
        screen: TabNavigator,
        navigationOptions: {
          header: null,
        },
      },
      EntryDetail: {
        screen: EntryDetail,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }),
      },
    }));    

export default class App extends React.Component {

// For phones with a notch, you'll need to use a SafeAreaView instead of View and render the UdaciStatusBar before that.
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}> 
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}