import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends TouchableOpacityProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...props }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed ? primaryColor + '90' : primaryColor,
                },
                props.style
            ]}
            {...props}
        >
            {children && <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>}
            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={textColor}
                />
            )}
        </Pressable>
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 50,
        marginTop: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    }
})
