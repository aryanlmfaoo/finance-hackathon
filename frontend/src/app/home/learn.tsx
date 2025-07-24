import React from 'react';
import { SafeAreaView, View, Text, FlatList, Pressable, Image, Platform, StatusBar, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install: expo install expo-linear-gradient
import Header from '../components/header';

const placeholderIcon = require('../../public/Learn.png');
const { width } = Dimensions.get('window');

// Enhanced modules data with progress and difficulty
const modules = [
    {
        id: '1',
        title: 'Budgeting Basics',
        description: 'Learn how to manage your money and create a budget that works for you.',
        estimatedTime: '10 min',
        icon: '',
        topics: ['Budgeting', 'Personal Finance', 'Planning'],
        difficulty: 'Beginner',
        progress: 0,
        color: '#3B82F6', // Blue
    },
    {
        id: '2',
        title: 'Saving & Investing',
        description: 'Discover the power of saving and the basics of investing for your future.',
        estimatedTime: '15 min',
        icon: '',
        topics: ['Saving', 'Investing', 'Wealth'],
        difficulty: 'Intermediate',
        progress: 45,
        color: '#10B981', // Green
    },
    {
        id: '3',
        title: 'Understanding Credit',
        description: 'Find out how credit works and how to build a healthy credit score.',
        estimatedTime: '12 min',
        icon: '',
        topics: ['Credit', 'Loans', 'Score'],
        difficulty: 'Beginner',
        progress: 100,
        color: '#8B5CF6', // Purple
    },
];

// Difficulty badge component
const DifficultyBadge = ({ difficulty, theme }) => {
    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'Beginner': return theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900 text-green-300';
            case 'Intermediate': return theme === 'light' ? 'bg-orange-100 text-orange-700' : 'bg-orange-900 text-orange-300';
            case 'Advanced': return theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900 text-red-300';
            default: return theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-gray-300';
        }
    };

    return (
        <View className={`px-2 py-1 rounded-full ${getDifficultyColor()}`}>
            <Text className={`text-xs font-semibold ${getDifficultyColor().split(' ')[1]}`}>
                {difficulty}
            </Text>
        </View>
    );
};

// Progress bar component
const ProgressBar = ({ progress, color }) => (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <View
            className="h-full rounded-full"
            style={{
                width: `${progress}%`,
                backgroundColor: color,
            }}
        />
    </View>
);

export default function LearnModulePicker() {
    const theme = useColorScheme();
    const bg = theme === 'light' ? 'bg-gray-50' : 'bg-neutral-900';
    const text = theme === 'light' ? 'text-neutral-900' : 'text-white';
    const cardBg = theme === 'light' ? 'bg-white' : 'bg-neutral-800';
    const shadowStyle = theme === 'light'
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        };

    const renderModuleCard = ({ item, index }) => (
        <Pressable
            className={`mb-6 rounded-3xl ${cardBg} overflow-hidden`}
            style={[
                shadowStyle,
                {
                    transform: [{ scale: 1 }],
                    width: width - 32,
                }
            ]}
            android_ripple={{ color: theme === 'light' ? '#f3f4f6' : '#374151' }}
            onPress={() => { /* navigation stub */ }}
            accessibilityRole="button"
            accessibilityLabel={`Open module: ${item.title}`}
        >
            {/* Header gradient */}
            <LinearGradient
                colors={[item.color + '20', item.color + '05']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="h-2"
            />

            <View className="p-5">
                <View className="flex-row items-start mb-4">
                    {/* Icon container with colored background */}
                    <View
                        className="w-16 h-16 rounded-2xl mr-4 items-center justify-center"
                        style={{ backgroundColor: item.color + '15' }}
                    >
                        <Image
                            source={item.icon ? { uri: item.icon } : placeholderIcon}
                            className="w-10 h-10"
                            resizeMode="contain"
                            accessibilityLabel="Module icon"
                        />
                    </View>

                    <View className="flex-1">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className={`text-xl font-bold ${text}`} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <DifficultyBadge difficulty={item.difficulty} theme={theme} />
                        </View>

                        <Text className={`text-sm ${text} opacity-70 leading-5`} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                </View>

                {/* Progress section */}
                {item.progress > 0 && (
                    <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className={`text-sm font-medium ${text} opacity-70`}>
                                Progress
                            </Text>
                            <Text className={`text-sm font-bold`} style={{ color: item.color }}>
                                {item.progress}%
                            </Text>
                        </View>
                        <ProgressBar progress={item.progress} color={item.color} />
                    </View>
                )}

                {/* Topics */}
                <View className="flex-row flex-wrap mb-4">
                    {item.topics && item.topics.map((topic, idx) => (
                        <View
                            key={topic + idx}
                            className="px-3 py-1.5 mr-2 mb-2 rounded-full bg-gray-100"
                            style={{ backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151' }}
                        >
                            <Text className={`text-xs font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                {topic}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Text className="text-xs font-medium mr-1" style={{ color: item.color }}>⏱</Text>
                        <Text className="text-xs font-medium" style={{ color: item.color }}>
                            {item.estimatedTime}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Text className="text-xs font-semibold mr-1" style={{ color: item.color }}>
                            {item.progress === 100 ? 'Completed' : item.progress > 0 ? 'Continue' : 'Start'}
                        </Text>
                        <Text className="text-sm" style={{ color: item.color }}>
                            {item.progress === 100 ? '✓' : '→'}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView
            className={`flex-1 ${bg}`}
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
            <View className="px-4 pt-6">
                {/* <Header /> */}

                {/* Hero section */}
                <View className="mb-6">
                    <Text className={`text-3xl font-black mb-3 text-center ${text}`}>
                        Pick a Learning Module
                    </Text>
                    <Text className={`text-base text-center leading-6 ${text} opacity-70 px-4`}>
                        Choose a topic to start learning. Each module is designed to be easy and fun for everyone!
                    </Text>
                </View>
            </View>

            <FlatList
                data={modules}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 32,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderModuleCard}
                ListEmptyComponent={
                    <View className="items-center justify-center py-16">
                        <Text className="text-6xl mb-4">📚</Text>
                        <Text className={`text-center text-xl font-semibold mb-2 ${text}`}>
                            No modules available
                        </Text>
                        <Text className={`text-center ${text} opacity-70 px-8`}>
                            New learning modules are coming soon. Check back later!
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
