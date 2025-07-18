import { Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, useColorScheme } from "react-native";


export default function Login() {
  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      className="flex-1 justify-center items-center bg-white dark:bg-neutral-900 px-6"
      accessible
      accessibilityLabel="Login screen"
    >
      {/* Logo - Responsive, centered */}
      <Image
        source={useColorScheme() === 'light' ? require('../public/UmeedFullLight.png') : require('../public/UmeedFullDark.png')}
        className="w-[230px] h-[96px] mb-10"
        resizeMode="contain"
        accessibilityLabel="Umeed Logo"
      />
      {/* Google Sign-In Button */}
      <TouchableOpacity
        className="flex-row items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-6 py-3 shadow-md active:opacity-80 focus:ring-2 focus:ring-blue-500 mb-2"
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Sign in with Google"
      >
        <Image
          source={require('../public/GoogleLogo.png')}
          className="w-6 h-6 mr-3"
          resizeMode="contain"
          accessibilityLabel="Google Logo"
        />
        <Text className="text-base font-semibold text-neutral-800 dark:text-white">
          Sign In With Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}