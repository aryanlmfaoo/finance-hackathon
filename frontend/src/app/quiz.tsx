import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar, Animated, useWindowDimensions } from 'react-native';

export default function Quiz() {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [xp, setXp] = useState(0);
  const [xpChange, setXpChange] = useState<null | number>(null);
  const xpAnim = useRef(new Animated.Value(0)).current;

  const data = {
    question: 'What is the meaning of Debit?',
    options: ['Debit', 'Credit', 'Debit Card', 'Credit Card'],
    indexOfCorrectAnswer: 0,
    explanation: 'Debit is a type of payment that is deducted from your bank account.',
    xpGain: 10,
    xpLoss: -5,
  };

  const handleSelect = (index: number) => {
    if (selected !== null) return; // Prevent multiple answers
    setSelected(index);
    setShowFeedback(true);
    const isCorrect = index === data.indexOfCorrectAnswer;
    const change = isCorrect ? data.xpGain : data.xpLoss;
    setXpChange(change);
    setXp((prev) => prev + change);
    xpAnim.setValue(0);
    Animated.timing(xpAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => setTimeout(() => setXpChange(null), 800));
  };

  // Animation styles for XP feedback
  const xpAnimStyle = {
    opacity: xpAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 0] }),
    transform: [
      {
        translateY: xpAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -40] }),
      },
    ],
  };

  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      className="flex-1 bg-white dark:bg-neutral-900 px-4 justify-center"
      accessible
      accessibilityLabel="Quiz screen"
    >
      <View className="mb-8">
        <Text className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center mb-2">
          {data.question}
        </Text>
        <Text className="text-base text-neutral-500 text-center">XP: {xp}</Text>
      </View>
      <View className="flex flex-col gap-4 items-center w-full">
        {data.options.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = data.indexOfCorrectAnswer === idx;
          let optionColor = 'bg-white dark:bg-neutral-800 border-neutral-300';
          if (showFeedback) {
            if (isSelected && isCorrect) optionColor = 'bg-green-100 border-green-500';
            else if (isSelected && !isCorrect) optionColor = 'bg-red-100 border-red-500';
            else if (isCorrect) optionColor = 'bg-green-50 border-green-400';
          }
          return (
            <TouchableOpacity
              key={idx}
              className={`w-full max-w-[500px] border-2 rounded-xl py-4 px-3 ${optionColor}`}
              onPress={() => handleSelect(idx)}
              disabled={selected !== null}
              accessibilityRole="button"
              accessibilityLabel={`Answer option: ${option}`}
              accessibilityState={{ selected: isSelected }}
              activeOpacity={0.8}
            >
              <Text className="text-lg text-neutral-900 dark:text-white text-center font-medium">
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* XP Animation */}
      {xpChange !== null && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: width / 2 - 40,
              top: '40%',
              zIndex: 10,
            },
            xpAnimStyle,
          ]}
          pointerEvents="none"
        >
          <Text
            className={`text-2xl font-bold ${xpChange > 0 ? 'text-green-500' : 'text-red-500'}`}
            accessibilityLabel={xpChange > 0 ? `Gained ${xpChange} XP` : `Lost ${-xpChange} XP`}
          >
            {xpChange > 0 ? `+${xpChange} XP` : `${xpChange} XP`}
          </Text>
        </Animated.View>
      )}
      {/* Feedback Section */}
      {showFeedback && (
        <View className="mt-8 items-center w-full">
          {selected === data.indexOfCorrectAnswer ? (
            <Text className="text-xl font-semibold text-green-600 mb-2">Congratulations! 🎉</Text>
          ) : (
            <>
              <Text className="text-xl font-semibold text-red-600 mb-2">Incorrect</Text>
              <Text className="text-base text-neutral-700 dark:text-neutral-200 mb-1">
                Correct answer: <Text className="font-bold text-green-600">{data.options[data.indexOfCorrectAnswer]}</Text>
              </Text>
              <Text className="text-base text-neutral-500 text-center max-w-[400px]">
                {data.explanation}
              </Text>
            </>
          )}
        </View>
      )}
      <TouchableOpacity className="flex justify-center items-center mt-10 bg-black px-8 py-3 rounded-full  focus:ring-2 focus:ring-white transition-all">
        <Text className="text-white text-lg font-bold">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}