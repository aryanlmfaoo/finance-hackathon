import { View, Image } from "react-native"
import { useColorScheme } from "react-native"

export default function Header() {
    return (
        <View className="justify-center items-center mb-4">
            <Image
                source={useColorScheme() === 'light'
                    ? require('../../public/UmeedSmallLight.png')
                    : require('../../public/UmeedFullDark.png')
                }
                resizeMode="contain"
                className="w-45 h-20"
            />
        </View>
    )
}
