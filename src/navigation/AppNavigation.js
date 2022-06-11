import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import { Platform, Text/* , View */ } from 'react-native'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { Ionicons } from '@expo/vector-icons'
import { THEME/* , globalStyles */ } from '../theme'
import moment from 'moment'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const TabAndroid = createMaterialBottomTabNavigator()
const Drawer = createDrawerNavigator()


const navigatorOptions = {
  headerTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
  headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white' },
  headerTitleAlign: 'center',
}

const tabNavigatorOptions = Platform.OS === 'android' 
  ? (({ route }) => ({
      tabBarIcon: ({ focused, color='orange', size=25 }) => {
        let iconName
        if (route.name === 'HomeStack') {
          iconName = focused
            ? 'ios-albums'
            : 'ios-albums-outline'
        } else if (route.name === 'BookedStack') {
          iconName = focused ? 'ios-star' : 'ios-star-outline';
        } 
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    }))
  : (({ route }) => ({
      tabBarIcon: ({ focused, color='orange', size=25 }) => {
        let iconName
        if (route.name === 'HomeStack') {
          iconName = focused
            ? 'ios-albums'
            : 'ios-albums-outline'
        } else if (route.name === 'BookedStack') {
          iconName = focused ? 'ios-star' : 'ios-star-outline';
        } 
        return <Ionicons name={iconName} size={size} color={color} />;
        },

      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
      headerShown: false
    })
)

const MainStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Main"
      screenOptions={navigatorOptions}
    >
      <Stack.Screen 
        name="Main" 
        component={Platform.OS === 'android' ? MyTabsAndroid : MyTabs} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Create" 
        component={CreateScreen} 
        options={{title: 'Create post'}}
      />
      <Stack.Screen 
        name="Post" 
        component={PostScreen} 
        options={({ route: { params: {date, booked, toggleHandler} } }) => ({
          title: `Post from ${moment(new Date(date)).format('DD/MM/YYYY')}`,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Bookmark'
                iconName={booked ? 'ios-star' : 'ios-star-outline'}
                onPress={toggleHandler}
              />
            </HeaderButtons>
          )
        })}
      />
      {/* <Stack.Screen 
        name="Calendar date" 
        component={CalendarMenu} 
        options={{animationEnabled: true}}
      /> */}
    </Stack.Navigator>
  )
}

const HomeTabStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={navigatorOptions}
    >
      <Stack.Screen 
        name="Myblog" 
        component={MainScreen} 
        options={({ navigation }) => ({
          title: 'Awesome app',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Take photo'
                iconName='ios-camera'
                onPress={() => navigation.push('Create')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          )
        })}
      />
    </Stack.Navigator>
  )
}

const BookmarkedTabStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={navigatorOptions}
    >
      <Stack.Screen 
        name="Booked" 
        component={BookedScreen} 
        options={({ navigation }) => ({
          title: 'Favorites',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Toggle Drawer'
                iconName='arrow-back-outline'
                onPress={() => navigation.goBack()}
              />
            </HeaderButtons>
          )
        })}
      />
    </Stack.Navigator>
  )
}

const AboutStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={navigatorOptions}
    >
      <Stack.Screen 
        name='About'
        component={AboutScreen} 
        options={({ navigation }) => ({
          title: 'About us',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          )
        })}
      />
    </Stack.Navigator>
  )
}

const CreateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={navigatorOptions}
    >
      <Stack.Screen 
        name='Create' 
        component={CreateScreen} 
        options={({ navigation }) => ({
          title: 'Create post',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          )
        })}
      />
    </Stack.Navigator>
  )
}

//const CalendarMenu = () => <View style={{flex: 1, backgroundColor: 'blue'}} />

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      screenOptions={tabNavigatorOptions}
    >
      <Tab.Screen name="HomeStack" component={HomeTabStack} options={{tabBarLabel: 'All'}} />
      {/* <Tab.Screen name="Calendar" component={CalendarMenu} options={{tabBarLabel: false, tabBarIcon: () => <Ionicons name='calendar-outline' size={25} color='#fff' />}} /> */}
      <Tab.Screen name="BookedStack" component={BookmarkedTabStack} options={{tabBarLabel: 'Favourites'}} />
    </Tab.Navigator>
  )
}


const MyTabsAndroid = () => {
  return (
    <TabAndroid.Navigator
      initialRouteName='HomeStack'
      backBehavior='order'
      activeColor="tomato"
      inactiveColor="#fff"
      shifting={true}
      barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
      screenOptions={tabNavigatorOptions}
    >
      <TabAndroid.Screen name="HomeStack" component={HomeTabStack} options={{tabBarLabel: 'All'}}  />
      {/* <TabAndroid.Screen 
        name="Calendar" 
        component={CalendarMenu} 
        options={{tabBarLabel: false, tabBarIcon: () => <Ionicons name='calendar-outline' size={25} color='#fff' />}} 
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault()
            navigation.navigate('Calendar date')
          }
        })}/> */}
      <TabAndroid.Screen name="BookedStack" component={BookmarkedTabStack} options={{tabBarLabel: 'Favourites'}} /* options={{tabBarIcon: () => <Ionicons name='ios-star' size={25} />}} */ />
    </TabAndroid.Navigator>
  )
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerActiveTintColor: THEME.MAIN_COLOR, drawerLabelStyle: { fontFamily: 'open-bold' }}}>
      <Drawer.Screen name="MainScreen" component={MainStack} />
      <Drawer.Screen name="About " component={AboutStack} />
      <Drawer.Screen name="Create " component={CreateStack} /* options={{ drawerLabel: 'Создать', drawerIcon: () => <Ionicons name='ios-star' /> }} *//>
    </Drawer.Navigator>
  );
}


export const AppNavigation = () => {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}><MyDrawer /></NavigationContainer>
  )
}
