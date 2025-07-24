import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import { Text, SafeAreaView } from 'react-native'
import { auth } from "./auth/firebase";

export default function index() {
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/home/feed");
            } else {
                router.replace("/auth/login");
            }
        });
        return unsubscribe;
    }, []);
    return (
        <>
            <SafeAreaView className="flex-1 justify-center items-center dark:bg-neutral-900">
                <Text className=" dark:text-white">Loading...</Text>
            </SafeAreaView>
        </>
    );
}