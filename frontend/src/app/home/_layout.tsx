import "../../global.css";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerShown:false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown:false,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          headerShown:false,

        }}
      />
    </Tabs>
  );
}
