import { Link } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Page() {
  return (
    <View className={`flex-1 justify-center items-center bg-white dark:bg-neutral-900`}>
      <Text className="text-black dark:text-white">Hello World</Text>
      <Link href="/home/quiz" className="text-black dark:text-white">Quiz Page</Link>
      <Link href="/login" className="text-black dark:text-white">Login Page</Link>
    </View >
  );
}
