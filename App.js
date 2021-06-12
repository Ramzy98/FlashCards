import React from "react";
import Home from "./components/Home";
import Deck from "./components/Deck";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, add } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddNewDeck from "./components/AddNewDeck";
import AddCard from "./components/AddCard";
import StartQuiz from "./components/StartQuiz";
import { setLocalNotification } from "./utils/helpers";
import { render } from "react-dom";
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Deck" component={Deck} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
      <HomeStack.Screen name="StartQuiz" component={StartQuiz} />
    </HomeStack.Navigator>
  );
}
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Add New Deck") {
                iconName = "add";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Add New Deck" component={AddNewDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
