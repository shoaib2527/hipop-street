import React from "react";
import { FlatList, ImageBackground, Text, View, TouchableOpacity, Alert } from "react-native";
import colors from "../../Themes/Colors";
import styles from "./TilesListStyles";
import {Button, Card} from "native-base"

export interface Props{
    data: any,
    onPress: () => void;
}

class TilesList extends React.Component<Props>{
    public renderTiles = ({item}) => {
        return(
            <Card style={styles.cardItemStyle}>
                <ImageBackground style={styles.cardImage} source={{uri: item.image}} resizeMode={"cover"}>
                    <TouchableOpacity onPress={() => {this.props.onPress}}>
                        <Text style={styles.subHeading}>{item.name}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Card>
        )
    };
    public render(){
        return(
            <FlatList data={this.props.data} numColumns={2} renderItem={this.renderTiles} pagingEnabled={true} />
        );
    }
}

export default TilesList;