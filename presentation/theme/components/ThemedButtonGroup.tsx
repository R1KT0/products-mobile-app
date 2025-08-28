import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";


interface Props {
    options: string[];
    selectedOption: string[];

    onSelect: (option: string) => void;
}


const ThemedButtonGroup = ({ options, selectedOption, onSelect }: Props) => {

    const primaryColor = useThemeColor({}, 'primary');

    return (
        <View style={styles.container}>
            {
                options.map(option => (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedOption.includes(option) && {
                                backgroundColor: primaryColor + '90'
                            }
                        ]}
                        key={option}
                        onPress={ () => onSelect(option) }
                    >
                        <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={[
                            styles.buttonText,
                            selectedOption.includes(option) && {
                                color: '#fff'
                            }
                        ]}
                        >
                            {
                                option[0].toUpperCase() + option.slice(1)
                            }
                        </Text>
                    </TouchableOpacity>
                ))
            }

        </View>
    )
}

export default ThemedButtonGroup;




const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        borderRadius: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    buttonText: {
        fontSize: 16,
    },

    selectedButtonText: {
        color: '#fff'
    }
})