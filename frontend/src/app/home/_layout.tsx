import { Tabs } from "expo-router";
import { useColorScheme, Image } from "react-native";
import { useEffect } from "react";
import { setBackgroundColorAsync } from 'expo-system-ui'

export default function Layout() {
  const theme = useColorScheme()

  useEffect(() => {
    theme === 'light' ? setBackgroundColorAsync('#FFFFFF') : setBackgroundColorAsync("#171717");
  }, [theme]); // Add theme dependency

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'light' ? "#FFFFFF" : "#171717",
          borderTopColor: theme === 'light' ? "#E5E7EB" : "#374151", // Optional: border color
          borderTopWidth: 1,
        },
        tabBarInactiveTintColor: theme === 'light' ? "#9CA3AF" : "#6B7280", // Better inactive colors
        tabBarActiveTintColor: "#4F8EF7", // Your active color
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      {/* Your existing Tabs.Screen components remain the same */}
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
                tintColor: focused ? '#4F8EF7' : color
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
                tintColor: focused ? '#4F8EF7' : color
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
                tintColor: focused ? '#4F8EF7' : color
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          headerShown: false,
          tabBarIcon: (({ size, color, focused }) => (
            <Image
              source={require('../../public/Learn.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#4F8EF7' : color
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
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
                tintColor: focused ? '#4F8EF7' : color
              }}
              resizeMode="contain"
            />
          ))
        }}
      />
    </Tabs>
  );
}
