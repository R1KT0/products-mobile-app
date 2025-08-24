import { Ionicons } from '@expo/vector-icons';
import { Link, LinkProps } from 'expo-router';
import React from 'react';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedLink = ({ style, ...props }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');


    return (
        <Link
            style={[
                {
                    color: primaryColor,
                }
            ]}
            {...props}
        />
    )
}

export default ThemedLink