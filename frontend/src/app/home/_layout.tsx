import { Tabs } from "expo-router";
import { useColorScheme, Image } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: useColorScheme() === 'light' ? "#FFFFFF" : "#171717",
        tabBarInactiveBackgroundColor: useColorScheme() === 'light' ? "#FFFFFF" : "#171717",
        tabBarInactiveTintColor: useColorScheme() === 'light' ? "#171717" : "#FFFFFF",
        tabBarActiveTintColor: useColorScheme() === 'light' ? "#171717" : "#FFFFFF"
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerShown: false,
          tabBarIcon: (({ size, color, focused }) => (
            <Image
              source={require('../../public/Home.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#0000FF' : color // fix ts(this)
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          headerShown: false,
          tabBarIcon: (({ size, color, focused }) => (
            <Image
              source={require('../../public/newspaper.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#0000FF' : color
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          headerShown: false,
          tabBarIcon: (({ size, color, focused }) => (
            <Image
              source={require('../../public/quiz.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#0000FF' : color
              }}
              resizeMode="contain"
            />
          ))
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: (({ size, color, focused }) => (
            <Image
              source={require('../../public/profile.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#0000FF' : color
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
    </Tabs>

  );
}
