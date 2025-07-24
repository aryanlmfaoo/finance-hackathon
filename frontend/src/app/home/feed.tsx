import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  FlatList
} from 'react-native';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Header from '../components/header';

const { width } = Dimensions.get('window');

// Mock user data - replace with actual Firebase data
const mockUser = {
  name: 'Arjun',
  totalXP: 850,
  completedModules: 3,
  currentStreak: 7,
  level: 'Advanced',
  todayTip: "Consider investing in SIP for long-term wealth building. Start with ₹2000/month.",
  recentActivity: [
    { type: 'module', title: 'Understanding Credit', xp: 50, time: '2h ago' },
    { type: 'quiz', title: 'Investment Basics Quiz', xp: 30, time: '1d ago' },
    { type: 'simulation', title: 'Avoided Phishing Scam', xp: 25, time: '2d ago' }
  ]
};

// Quick actions data
const quickActions = [
  { id: 1, title: 'Learn', subtitle: 'New Module', icon: '📚', color: '#3B82F6', route: '/learn' },
  { id: 2, title: 'Quiz', subtitle: 'Test Skills', icon: '🎯', color: '#10B981', route: '/quiz' },
  { id: 3, title: 'Simulate', subtitle: 'Fraud Test', icon: '🛡️', color: '#F59E0B', route: '/simulate' },
  { id: 4, title: 'News', subtitle: 'Stay Updated', icon: '📰', color: '#8B5CF6', route: '/news' }
];

// Featured modules
const featuredModules = [
  {
    id: '4',
    title: 'Digital Payment Safety',
    description: 'Learn to protect yourself from UPI frauds and digital scams.',
    estimatedTime: '8 min',
    difficulty: 'Beginner',
    color: '#EF4444',
    progress: 0,
    isNew: true
  },
  {
    id: '5',
    title: 'Tax Planning 101',
    description: 'Understanding income tax and saving strategies for Indians.',
    estimatedTime: '12 min',
    difficulty: 'Intermediate',
    color: '#06B6D4',
    progress: 0,
    isPopular: true
  }
];

export default function HomeScreen() {
  const theme = useColorScheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  const bg = theme === 'light' ? 'bg-gray-50' : 'bg-neutral-900';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-neutral-800';
  const text = theme === 'light' ? 'text-neutral-900' : 'text-white';
  const mutedText = theme === 'light' ? 'text-gray-500' : 'text-gray-400';

  // Get XP Level System
  const getXPLevel = (xp) => {
    if (xp >= 2000) return { level: 'Master', color: '#DC2626', emoji: '👑' };
    if (xp >= 1500) return { level: 'Expert', color: '#10B981', emoji: '🏆' };
    if (xp >= 1000) return { level: 'Advanced', color: '#8B5CF6', emoji: '⭐' };
    if (xp >= 500) return { level: 'Intermediate', color: '#F59E0B', emoji: '📈' };
    return { level: 'Novice', color: '#3B82F6', emoji: '🌱' };
  };

  const xpLevel = getXPLevel(mockUser.totalXP);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Update time every minute for greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const QuickActionCard = ({ item }) => (
    <Link href={item.route} asChild>
      <Pressable
        className={`w-20 items-center mr-4`}
        android_ripple={{ color: item.color + '20' }}
      >
        <View
          className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
          style={{ backgroundColor: item.color + '15' }}
        >
          <Text className="text-2xl">{item.icon}</Text>
        </View>
        <Text className={`text-sm font-semibold ${text} text-center`} numberOfLines={1}>
          {item.title}
        </Text>
        <Text className={`text-xs ${mutedText} text-center`} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </Pressable>
    </Link>
  );

  const ActivityItem = ({ item }) => {
    const getActivityColor = (type) => {
      switch (type) {
        case 'module': return '#3B82F6';
        case 'quiz': return '#10B981';
        case 'simulation': return '#F59E0B';
        default: return '#8B5CF6';
      }
    };

    const getActivityIcon = (type) => {
      switch (type) {
        case 'module': return '📚';
        case 'quiz': return '🎯';
        case 'simulation': return '🛡️';
        default: return '⭐';
      }
    };

    const color = getActivityColor(item.type);

    return (
      <View className="flex-row items-center py-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: color + '15' }}
        >
          <Text className="text-lg">{getActivityIcon(item.type)}</Text>
        </View>
        <View className="flex-1">
          <Text className={`text-sm font-medium ${text}`} numberOfLines={1}>
            {item.title}
          </Text>
          <Text className={`text-xs ${mutedText}`}>
            +{item.xp} XP • {item.time}
          </Text>
        </View>
      </View>
    );
  };

  const FeaturedModuleCard = ({ item }) => (
    <Link href={`/learn/${item.id}`} asChild>
      <Pressable
        className={`w-72 mr-4 rounded-3xl overflow-hidden ${cardBg}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: theme === 'light' ? 0.1 : 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
        android_ripple={{ color: theme === 'light' ? '#f3f4f6' : '#374151' }}
      >
        {/* Header gradient */}
        <LinearGradient
          colors={[item.color + '40', item.color + '20']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-20 justify-end p-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {item.title}
            </Text>
            {item.isNew && (
              <View className="px-2 py-1 bg-white bg-opacity-90 rounded-full">
                <Text className="text-xs font-bold" style={{ color: item.color }}>
                  NEW
                </Text>
              </View>
            )}
            {item.isPopular && (
              <View className="px-2 py-1 bg-white bg-opacity-90 rounded-full">
                <Text className="text-xs font-bold" style={{ color: item.color }}>
                  POPULAR
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <View className="p-4">
          <Text className={`text-sm ${mutedText} mb-3`} numberOfLines={2}>
            {item.description}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xs mr-1" style={{ color: item.color }}>⏱</Text>
              <Text className="text-xs font-medium" style={{ color: item.color }}>
                {item.estimatedTime}
              </Text>
            </View>
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: item.color + '15' }}
            >
              <Text className="text-xs font-medium" style={{ color: item.color }}>
                {item.difficulty}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView
      className={`flex-1 ${bg}`}
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
    >
      <Header />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Welcome Section */}
        <View className="px-4 mb-6">
          <LinearGradient
            colors={[xpLevel.color + '20', xpLevel.color + '10', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className={`rounded-3xl p-6 ${cardBg}`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: theme === 'light' ? 0.1 : 0.4,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className={`text-lg ${mutedText} mb-1`}>
                  {getGreeting()} 👋
                </Text>
                <Text className={`text-3xl font-black ${text} mb-2`}>
                  {mockUser.name}!
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">{xpLevel.emoji}</Text>
                  <Text
                    className="text-base font-bold mr-2"
                    style={{ color: xpLevel.color }}
                  >
                    {xpLevel.level}
                  </Text>
                  <Text className={`text-sm ${mutedText}`}>
                    • {mockUser.totalXP} XP
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
                  style={{ backgroundColor: xpLevel.color }}
                >
                  <Text className="text-2xl text-white font-bold">
                    {mockUser.name[0]}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs font-medium mr-1" style={{ color: xpLevel.color }}>
                    🔥
                  </Text>
                  <Text className="text-xs font-bold" style={{ color: xpLevel.color }}>
                    {mockUser.currentStreak} day streak
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className={`text-2xl font-black ${text}`}>
                  {mockUser.completedModules}
                </Text>
                <Text className={`text-xs ${mutedText}`}>Modules</Text>
              </View>
              <View className="items-center">
                <Text className={`text-2xl font-black ${text}`}>
                  {mockUser.currentStreak}
                </Text>
                <Text className={`text-xs ${mutedText}`}>Day Streak</Text>
              </View>
              <View className="items-center">
                <Text className={`text-2xl font-black ${text}`}>
                  {mockUser.totalXP}
                </Text>
                <Text className={`text-xs ${mutedText}`}>Total XP</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className={`text-xl font-bold ${text} px-4 mb-4`}>Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {quickActions.map(item => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* Today's Tip */}
        <View className="px-4 mb-6">
          <Text className={`text-xl font-bold ${text} mb-4`}>💡 Today's Tip</Text>
          <View className={`${cardBg} rounded-2xl p-4`}>
            <View className="flex-row items-start">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#F59E0B15' }}
              >
                <Text className="text-xl">💰</Text>
              </View>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${text} mb-2`}>
                  Personalized for You
                </Text>
                <Text className={`text-sm ${mutedText} leading-5`}>
                  {mockUser.todayTip}
                </Text>
                <Pressable className="mt-3">
                  <Text className="text-sm font-medium" style={{ color: '#F59E0B' }}>
                    Learn More →
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 mb-6">
          <Text className={`text-xl font-bold ${text} mb-4`}>Recent Activity</Text>
          <View className={`${cardBg} rounded-2xl p-4`}>
            {mockUser.recentActivity.map((item, index) => (
              <ActivityItem key={index} item={item} />
            ))}
            <Link href="/profile" asChild>
              <Pressable className="mt-2">
                <Text className="text-sm font-medium text-center" style={{ color: xpLevel.color }}>
                  View All Activity →
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Featured Modules */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className={`text-xl font-bold ${text}`}>✨ Featured</Text>
            <Link href="/learn" asChild>
              <Pressable>
                <Text className="text-sm font-medium" style={{ color: xpLevel.color }}>
                  See All →
                </Text>
              </Pressable>
            </Link>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {featuredModules.map(item => (
              <FeaturedModuleCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
