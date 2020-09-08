import React from "react";
import { Header } from "native-base";
import styles from "./CommonHeaderStyles";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeArea } from 'react-native-safe-area-context';

export interface OwnProps {
    leftItem?: any;
    rightItem?: any;
    title: string;
    insets: any;
}

export type Props = OwnProps;

export default function CommonHeader(props: any) {
    // public render() {
    const insets = useSafeArea();
    // console.log("insets", insets)
    return (
        <Header noShadow={true} style={{ ...styles.header, marginTop: insets.top * -1, ...props.style }}>
            <View style={styles.leftStyle}>
                {props.leftItem}
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <View style={styles.rightStyle}>
                {props.rightItem}
            </View>
        </Header>
    )
    // }
}

