import { Dimensions } from "react-native";

export const findCurrentSongIndex = (songsArray: any[], currentSong: any) => {
    const currentIndx = songsArray.findIndex((val) => {
        let firstCondition: boolean = true;
        let secondCondition: boolean = true;
        var aProps = Object.getOwnPropertyNames(val);
        var bProps = Object.getOwnPropertyNames(currentSong);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            firstCondition = false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (val[propName] !== currentSong[propName]) {
                secondCondition = false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return firstCondition && secondCondition;
    });
    return currentIndx;
}

export const isFavorite = (favList: Array<any>, songId: string) => {
    if (favList) {
        let isFav: boolean = false;
        let i = 0;
        for (i = 0; i < favList.length; i++) {
            if (favList[i].songid === songId) {
                isFav = true;
                return isFav;
            }
        }
        return isFav;
    }
}

export const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};