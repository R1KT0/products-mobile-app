import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

export const ThemedTextInput = ({ icon, style, ...props }: Props) => {

    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    const [isActive, setIsActive] = useState(false);

    const inputRef = useRef<TextInput>(null);


    return (
        <View
            style={[
                {
                    ...styles.border,
                    borderColor: isActive ? primaryColor : '#ccc',
                },
                style as StyleProp<ViewStyle>
            ]}
            onTouchStart={() => inputRef.current?.focus()}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={textColor}
                    style={{ marginRight: 10 }}
                />
            )}

            <TextInput
                placeholderTextColor="#5c5c5c"
                ref={inputRef}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                style={[
                    styles.input,
                    {
                        color: textColor,
                    }
                ]}
                {...props}
            />
        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 50,
    },

    input: {
        flex: 1,
        fontSize: 16,
    }
})