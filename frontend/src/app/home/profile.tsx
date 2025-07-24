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
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/header';

// Mock user data - replace with actual user data from Firebase
const mockUser = {
  uid: 'user123',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  phoneNumber: '+919876543210',
  age: 28,
  income: 750000, // Annual income in INR
  goals: ['Save for House', 'Emergency Fund', 'Retirement'],
  completedModules: ['1', '3'],
  progress: { '1': 100, '2': 45, '3': 100 },
  quizScores: { 'quiz1': 85, 'quiz2': 92, 'quiz3': 78 },
  totalXP: 850 // Total XP earned
};

const GOAL_OPTIONS = [
  'Save for House', 'Emergency Fund', 'Retirement', 'Pay Off Debt',
  'Start Business', 'Education', 'Travel', 'Investment', 'Insurance',
  'Marriage Fund', 'Child Education'
];

const INCOME_RANGES = [
  { label: 'Under ₹3 Lakh', value: 200000 },
  { label: '₹3-6 Lakh', value: 450000 },
  { label: '₹6-10 Lakh', value: 800000 },
  { label: '₹10-15 Lakh', value: 1250000 },
  { label: '₹15-25 Lakh', value: 2000000 },
  { label: 'Over ₹25 Lakh', value: 3000000 }
];

export default function ProfileScreen() {
  const theme = useColorScheme();
  const [user, setUser] = useState(mockUser);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [tempValue, setTempValue] = useState('');
  const [selectedGoals, setSelectedGoals] = useState(user.goals || []);

  const bg = theme === 'light' ? 'bg-gray-50' : 'bg-neutral-900';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-neutral-800';
  const text = theme === 'light' ? 'text-neutral-900' : 'text-white';
  const mutedText = theme === 'light' ? 'text-gray-500' : 'text-gray-400';

  // Calculate stats
  const totalModules = Object.keys(user.progress).length;
  const completedModules = user.completedModules.length;
  const averageProgress = totalModules > 0
    ? Math.round(Object.values(user.progress).reduce((a, b) => a + b, 0) / totalModules)
    : 0;

  // XP Level System
  const getXPLevel = (xp) => {
    if (xp >= 2000) return { level: 'Master', color: '#DC2626', emoji: '👑', range: '2000+ XP' };
    if (xp >= 1500) return { level: 'Expert', color: '#10B981', emoji: '🏆', range: '1500-2000 XP' };
    if (xp >= 1000) return { level: 'Advanced', color: '#8B5CF6', emoji: '⭐', range: '1000-1500 XP' };
    if (xp >= 500) return { level: 'Intermediate', color: '#F59E0B', emoji: '📈', range: '500-1000 XP' };
    return { level: 'Novice', color: '#3B82F6', emoji: '🌱', range: '0-500 XP' };
  };

  const xpLevel = getXPLevel(user.totalXP);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue?.toString() || '');
    if (field === 'goals') {
      setSelectedGoals(user.goals || []);
    }
    setEditModalVisible(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user };

    switch (editingField) {
      case 'name':
        updatedUser.name = tempValue;
        break;
      case 'age':
        updatedUser.age = parseInt(tempValue) || undefined;
        break;
      case 'income':
        updatedUser.income = parseInt(tempValue) || undefined;
        break;
      case 'goals':
        updatedUser.goals = selectedGoals;
        break;
    }

    setUser(updatedUser);
    setEditModalVisible(false);
    // Here you would update Firebase
  };

  const toggleGoal = (goal) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const formatIncome = (income) => {
    if (!income) return 'Not specified';
    if (income >= 10000000) {
      return `₹${(income / 10000000).toFixed(1)} Cr`;
    } else if (income >= 100000) {
      return `₹${(income / 100000).toFixed(1)} L`;
    } else {
      return `₹${(income / 1000).toFixed(0)}K`;
    }
  };

  const StatCard = ({ title, value, color, emoji, subtitle }) => (
    <View className={`flex-1 rounded-2xl p-4 mx-1 ${cardBg}`}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-2xl">{emoji}</Text>
        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: color + '20' }}
        >
          <Text className="text-xs font-bold" style={{ color }}>
            {value}
          </Text>
        </View>
      </View>
      <Text className={`text-lg font-bold ${text} mb-1`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-xs ${mutedText}`}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  const InfoRow = ({ label, value, onEdit, editable = true }) => (
    <Pressable
      onPress={() => editable && onEdit()}
      className={`flex-row items-center justify-between py-4 px-4 ${cardBg} rounded-xl mb-3`}
      disabled={!editable}
    >
      <Text className={`text-base font-medium ${text} flex-1`}>
        {label}
      </Text>
      <View className="flex-row items-center">
        <Text className={`text-base ${mutedText} mr-2`} numberOfLines={1}>
          {value}
        </Text>
        {editable && (
          <Text className={`text-sm ${mutedText}`}>✏️</Text>
        )}
      </View>
    </Pressable>
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
        {/* Profile Header */}
        <View className="px-4 mb-6">
          <LinearGradient
            colors={[xpLevel.color + '20', xpLevel.color + '05']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className={`rounded-3xl p-6 ${cardBg}`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: theme === 'light' ? 0.1 : 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View
                className="w-16 h-16 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: xpLevel.color }}
              >
                <Text className="text-2xl text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View className="flex-1">
                <Text className={`text-2xl font-bold ${text} mb-1`}>
                  {user.name}
                </Text>
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg mr-2">{xpLevel.emoji}</Text>
                  <Text
                    className="text-base font-semibold mr-2"
                    style={{ color: xpLevel.color }}
                  >
                    {xpLevel.level}
                  </Text>
                  <Text className={`text-sm ${mutedText}`}>
                    ({user.totalXP} XP)
                  </Text>
                </View>
              </View>
            </View>

            <Text className={`text-sm ${mutedText} mb-3`}>
              Learning Progress • {averageProgress}% Complete
            </Text>

            <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${averageProgress}%`,
                  backgroundColor: xpLevel.color,
                }}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Stats Section */}
        <View className="px-4 mb-6">
          <Text className={`text-xl font-bold ${text} mb-4`}>Your Progress</Text>
          <View className="flex-row mb-4">
            <StatCard
              title="Modules"
              value={`${completedModules}`}
              color="#10B981"
              emoji="📚"
              subtitle="Completed"
            />
            <StatCard
              title="Level"
              value={xpLevel.level}
              color={xpLevel.color}
              emoji={xpLevel.emoji}
              subtitle={xpLevel.range}
            />
          </View>
        </View>

        {/* Personal Info Section */}
        <View className="px-4 mb-6">
          <Text className={`text-xl font-bold ${text} mb-4`}>Personal Information</Text>

          <InfoRow
            label="Full Name"
            value={user.name}
            onEdit={() => handleEdit('name', user.name)}
          />

          <InfoRow
            label="Email"
            value={user.email}
            editable={false}
            onEdit={() => { }}
          />

          <InfoRow
            label="Phone"
            value={user.phoneNumber}
            editable={false}
            onEdit={() => { }}
          />

          <InfoRow
            label="Age"
            value={user.age ? `${user.age} years old` : 'Not specified'}
            onEdit={() => handleEdit('age', user.age)}
          />

          <InfoRow
            label="Annual Income"
            value={formatIncome(user.income)}
            onEdit={() => handleEdit('income', user.income)}
          />

          <InfoRow
            label="Financial Goals"
            value={user.goals?.length ? `${user.goals.length} selected` : 'None selected'}
            onEdit={() => handleEdit('goals', "")}
          />
        </View>

        {/* Goals Display */}
        {user.goals && user.goals.length > 0 && (
          <View className="px-4 mb-6">
            <Text className={`text-xl font-bold ${text} mb-4`}>My Goals</Text>
            <View className="flex-row flex-wrap">
              {user.goals.map((goal, index) => (
                <View
                  key={goal + index}
                  className="px-4 py-2 mr-2 mb-2 rounded-full"
                  style={{ backgroundColor: xpLevel.color + '20' }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: xpLevel.color }}
                  >
                    {goal}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Personalized Income Tips */}
        <View className="px-4 mb-6">
          <Text className={`text-xl font-bold ${text} mb-4`}>💡 Tips for You</Text>
          <View className={`${cardBg} rounded-2xl p-4`}>
            <View className="flex-row items-start">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: xpLevel.color + '20' }}
              >
                <Text className="text-lg">💰</Text>
              </View>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${text} mb-2`}>
                  Personalized Financial Tips
                </Text>
                <Text className={`text-sm ${mutedText} leading-5`}>
                  Based on your income level of {formatIncome(user.income)} and your goals, here are some personalized tips to help you manage your finances better. This will be dynamically generated based on user data.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className={`${cardBg} rounded-t-3xl p-6`}>
            <Text className={`text-xl font-bold ${text} mb-4`}>
              Edit {editingField === 'goals' ? 'Goals' : editingField.charAt(0).toUpperCase() + editingField.slice(1)}
            </Text>

            {editingField === 'goals' ? (
              <ScrollView className="max-h-64 mb-4">
                {GOAL_OPTIONS.map(goal => (
                  <Pressable
                    key={goal}
                    onPress={() => toggleGoal(goal)}
                    className={`flex-row items-center justify-between py-3 px-4 mb-2 rounded-xl ${selectedGoals.includes(goal)
                      ? 'bg-blue-50 dark:bg-blue-900'
                      : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                  >
                    <Text className={`${text} flex-1`}>{goal}</Text>
                    {selectedGoals.includes(goal) && (
                      <Text className="text-blue-500">✓</Text>
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <TextInput
                className={`border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 mb-4 ${text} ${cardBg}`}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={editingField === 'income' ? 'Enter income in ₹' : `Enter ${editingField}`}
                placeholderTextColor={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                keyboardType={editingField === 'age' || editingField === 'income' ? 'numeric' : 'default'}
              />
            )}

            <View className="flex-row">
              <Pressable
                onPress={() => setEditModalVisible(false)}
                className="flex-1 py-3 px-4 mr-2 rounded-xl bg-gray-200 dark:bg-gray-700"
              >
                <Text className={`text-center font-semibold ${text}`}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSave}
                className="flex-1 py-3 px-4 ml-2 rounded-xl"
                style={{ backgroundColor: xpLevel.color }}
              >
                <Text className="text-center font-semibold text-white">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
