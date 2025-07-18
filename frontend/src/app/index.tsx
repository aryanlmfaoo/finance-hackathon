import { useRouter } from "expo-router";
import { Text, SafeAreaView } from 'react-native'
import { Link } from "expo-router";


export default function index() {
    const router = useRouter()
    return (
        <>
            <SafeAreaView className="flex-1 justify-center items-center dark:bg-neutral-900">
                <Text className=" dark:text-white">Hello World</Text>
                <Link className=" dark:text-white" href="/auth/login">Login</Link>
                <Link className=" dark:text-white" href="/home">Home</Link>
            </SafeAreaView>
        </>
    );
}