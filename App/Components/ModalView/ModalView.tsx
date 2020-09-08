import React from "react";
import { State } from "../MusicPlayer/MusicPlayer";
import { Modal, View, Text, ViewStyle } from "react-native";
import { Button } from "native-base";
import styles from "./ModalViewStyles";
import colors from "../../Themes/Colors";

export interface OwnProps {
    content: Element;
    visible: boolean;
    title: string;
    cancel: () => void;
    done: () => void;
}

export default class ModalView extends React.Component<OwnProps, State>{
    public render() {
        return (
            <View style={{ flex: 0.3 , width: "80%"}}>
                <Modal visible={this.props.visible} transparent={true} animationType={"fade"} >
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{this.props.title}</Text>
                        {this.props.content}
                        <View style={styles.btnView}>
                            <Button style={styles.btns} onPress={this.props.done}>
                                <Text style={{ color: colors.snow, alignSelf: "center", fontWeight: "bold"  }}>Done</Text>
                            </Button>
                            <Button style={styles.btns} onPress={this.props.cancel}>
                                <Text style={{ color: colors.snow, alignSelf: "center", fontWeight: "bold" }}>Cancel</Text>
                            </Button>
                        </View>

                    </View>
                </Modal>
            </View>

        )
    }
}