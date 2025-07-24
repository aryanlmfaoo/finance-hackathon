import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Header from "../components/header";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const router = useRouter()
  const theme = useColorScheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bg = theme === "light" ? "bg-gray-50" : "bg-neutral-900";
  const cardBg = theme === "light" ? "bg-white" : "bg-neutral-800";
  const text = theme === "light" ? "text-neutral-900" : "text-white";
  const mutedText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const accent = "#4F8EF7";

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home/feed");

    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${bg}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center"
      >
        <View className="px-6">
          <Header />
          <View className={`rounded-3xl ${cardBg} p-8 shadow-lg mt-2 mb-6`} style={{ elevation: 8 }}>
            <Text className={`text-3xl font-black mb-2 text-center ${text}`}>Welcome Back</Text>
            <Text className={`text-base text-center mb-6 ${mutedText}`}>Sign in to continue your journey</Text>

            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}

            <View className="mb-4">
              <Text className={`mb-1 font-medium ${text}`}>Email</Text>
              <TextInput
                className={`rounded-xl px-4 py-3 border ${theme === "light" ? "border-gray-200 bg-gray-100" : "border-neutral-700 bg-neutral-700"} ${text}`}
                placeholder="Enter your email"
                placeholderTextColor={theme === "light" ? "#9CA3AF" : "#6B7280"}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                accessibilityLabel="Email"
              />
            </View>

            <View className="mb-2">
              <Text className={`mb-1 font-medium ${text}`}>Password</Text>
              <View className="flex-row items-center rounded-xl border px-4 py-3"
                style={{ borderColor: theme === "light" ? "#E5E7EB" : "#374151", backgroundColor: theme === "light" ? "#F3F4F6" : "#374151" }}>
                <TextInput
                  className={`flex-1 ${text}`}
                  placeholder="Enter your password"
                  placeholderTextColor={theme === "light" ? "#9CA3AF" : "#6B7280"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                  accessibilityLabel="Password"
                />
                <TouchableOpacity onPress={() => setShowPassword((v) => !v)} accessibilityLabel={showPassword ? "Hide password" : "Show password"}>
                  <Text className={`text-lg ml-2 ${mutedText}`}>{showPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-end mb-6">
              <Link href="/auth/forgot" asChild>
                <Pressable disabled={loading}>
                  <Text className={`text-sm font-medium ${mutedText}`}>Forgot Password?</Text>
                </Pressable>
              </Link>
            </View>

            <Pressable
              className="rounded-xl py-3 items-center mb-4"
              style={{ backgroundColor: accent, opacity: loading ? 0.7 : 1 }}
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-base font-bold">Sign In</Text>
              )}
            </Pressable>

            <View className="flex-row justify-center mt-2">
              <Text className={`text-sm ${mutedText}`}>Don't have an account? </Text>
              <Link href="/auth/signup" asChild>
                <Pressable disabled={loading}>
                  <Link href={'/auth/signup'}><Text className="text-sm font-bold" style={{ color: accent }}>Sign Up</Text></Link>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView >
    </SafeAreaView >
  );
}