import React from "react";
import {View, ActivityIndicator, Text} from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../Reducers";
import colors from "../../Themes/Colors";

export interface Props{
    loading: boolean;
}
class LoaderComponent extends React.Component<Props>{
    public render(){
        return this.props.loading ? 
        (
            <View style={{backgroundColor: colors.transparent, width: "100%", height: "100%", justifyContent: "center", alignItems: "center",
                opacity: 0.5, zIndex: 6,
            }}>
                <ActivityIndicator color={colors.lightMaroon} size={"large"}></ActivityIndicator>
                <Text style={{color: colors.maroon, alignSelf: "center", marginTop: 10}}>Loading...</Text>
            </View>
        ) : (null)
    }
};
const mapStateToProps = (state: RootState):Props => ({
    loading: state.category.fetching || state.favorites.fetching || state.login.fetching || state.mySongs.fetching || state.profile.fetching
    || state.artist.fetching,
})
export default connect(mapStateToProps, null)(LoaderComponent);