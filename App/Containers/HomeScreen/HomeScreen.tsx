import { Card, Container, Icon, ListItem, Item, Button } from 'native-base';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  View,
  TextInput,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Linking,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import BottomBar from '../../Components/BottomBar';
import CommonHeader from '../../Components/CommonHeader/CommonHeader';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';
import genreData from '../../Lib/GenresData';
import { Playlist, PlaylistTypes } from '../../Lib/PlaylistTypes';
import { RootState } from '../../Reducers';
import { BottomBarActions } from '../../Reducers/BottomBarReducer';
import {
  CategoryAction,
  ICategoryResponse,
} from '../../Reducers/CategoryReducers';
import { SongsActions } from '../../Reducers/SongsReducer';
import { Images } from '../../Themes';
import colors from '../../Themes/Colors';
import { BottomBarBtns } from '../../Types/BottomBar';
import styles from './HomeScreenStyles';
import SoundPlayer from 'react-native-sound-player';
import { ISongData, OpenSong } from '../MusicPlayScreen/MusicPlayScreen';
import { SearchAction } from '../../Reducers/SearchReducer';
import TrackPlayer from 'react-native-track-player';
import RNTrackPlayer from 'react-native-track-player';
import { transformSongArray } from '../../Lib/SongQueueHelper';
import { UserRole } from '../SignupScreen/SignupScreen';
import Banner from '../../Components/BannerAd/Banner.component'



export interface State {
  croppedFeaturedSongs: any;
  showSearchBar: boolean;
  searchText: string;
  refreshing: boolean;
  showCross: boolean;
}
export interface OwnProps { }
export enum DataTypes {
  SONGS = 'Top Songs',
  ALBUMS = 'Categories',
  VIDEOS = 'Videos',
  PODCASTS = 'Podcasts',
}
export interface DispatchProps {
  setBottomTab: (btnName: BottomBarBtns) => void;
  setPlaylist: (list: Playlist) => void;
  getCategories: () => void;
  getHomeData: () => void;
  playSong: (song: ISongData) => void;
  shouldPlay: (play: boolean) => void;
  showPlay: (play: boolean) => void;
  searchSong: (keyword: string) => void;
  // songCat: () => void;
}

export interface StateProps {
  category: ICategoryResponse | undefined;
  loginToken: any;
  featuredSongs: any;
  featuredVideos: any;
  featuredPodcasts: any;
  isSongPlaying: boolean;
  musicPlayer: boolean;
  searchData: any;
  isSongSearching: boolean;
  videoCategories: any;
  userRole: UserRole;
}
export type Props = OwnProps &
  NavigationScreenProps &
  DispatchProps &
  StateProps;
class HomeScreen extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      croppedFeaturedSongs: [],
      showSearchBar: false,
      searchText: '',
      refreshing: false,
      showCross: false
    };
  }
  componentDidMount() {
    this.props.setBottomTab(BottomBarBtns.EXPLORE);
    this.props.getCategories();
    this.props.getHomeData();
    console.warn("==========================================================")
    Linking.addEventListener('url', this.handleOpenURL)
  }
  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    console.log("Event==>", event);
  }
  public selectSingleCategory = (data: any) => {
    this.props.navigation.navigate('Playlist', {
      comingFrom: PlaylistTypes.EXPLORE,
      category: data,
      isVideo: data.song_category.includes('videos'),
    });
  };
  public onRefresh = () => {
    // this.setState({ refreshing: true })
    this.props.getCategories();
    this.props.getHomeData();
    // setTimeout(() => {
    //     this.setState({ refreshing: false })
    // }, 2000)
  };
  public renderTextIcon = (title: string, data: any) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.push('SelectAllCategory', {
          params: { title: title, data: data },
        })
      }
      style={{ flexDirection: 'row' }}>
      <Text style={[styles.subHeading]}>{title}</Text>
      <Icon
        name={'ios-arrow-forward'}
        type={'Ionicons'}
        style={{
          fontSize: 18,
          padding: 0,
          marginLeft: 7,
          alignSelf: 'center',
          marginTop: 2,
          color: colors.charcoal,
        }}
      />
    </TouchableOpacity>
  );
  public renderGenreList = (data: any, noDataText: string) => {
    return data ? (
      <FlatList
        data={data.length > 15 ? data.slice(0, 10) : data}
        renderItem={(item) =>
          noDataText === DataTypes.VIDEOS || noDataText === DataTypes.ALBUMS
            ? this.renderGenreView(item)
            : this.renderFeauteredSongs(item, noDataText)
        }
        style={styles.listStyle}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    ) : (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.noDataText}>
            Currently there are no {noDataText} to display!{' '}
            <Text
              style={{ color: colors.lightMaroon }}
              onPress={() => this.reload(noDataText)}>
              Reload
          </Text>
          </Text>
          {/* <Icon name={"reload1"} type={"AntDesign"} style={styles.retryIcon} onPress={() => this.reload(noDataText)}/> */}
        </View>
      );
  };
  public reload = (dataName: string) => {
    if (dataName === DataTypes.ALBUMS) {
      this.props.getCategories();
    } else {
      this.props.getHomeData();
    }
  };

  public openSongScreen = (item) => {
    // console.log('item', item);
    RNTrackPlayer.reset();
    this.props.featuredSongs
      ? RNTrackPlayer.add(
        transformSongArray([item, ...this.props.featuredSongs]),
      )
      : RNTrackPlayer.add({
        id: item.songid ? item.songid : '0',
        url: item.song_file,
        title: item.song_name,
        artist: item.artistName,
        artwork: item.songimage,
        userid: item.userId
      });
    RNTrackPlayer.play();
    this.props.playSong(item);
    this.props.shouldPlay(true);
    this.props.showPlay(true);
    this.props.navigation.push('MusicPlayScreen', {
      songData: item,
      isSong: true,
      comingFrom: OpenSong.SCREEN,
    });
  };

  public openPodcastScreen = (item) => {
    RNTrackPlayer.reset();
    this.props.featuredPodcasts
      ? RNTrackPlayer.add(
        transformSongArray([item, ...this.props.featuredPodcasts]),
      )
      : RNTrackPlayer.add({
        id: item.songid,
        url: item.song_file,
        title: item.song_name,
        artist: item.artistName,
        artwork: item.songimage,
      });
    this.props.playSong(item);
    this.props.shouldPlay(true);
    this.props.showPlay(true);
    this.props.setPlaylist(this.props.featuredPodcasts);
    this.props.navigation.push('MusicPlayScreen', {
      songData: item,
      isSong: true,
      comingFrom: OpenSong.SCREEN,
    });
  };

  public renderFeauteredSongs = (item: any, text: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (text === DataTypes.VIDEOS) {
          } else if (text === DataTypes.PODCASTS) {
            this.openPodcastScreen(item.item);
          } else if (text === DataTypes.SONGS) {
            this.openSongScreen(item.item);
          }
        }}>
        <Card style={styles.songsCard}>
          <ImageBackground
            style={styles.cardImage}
            source={{ uri: item.item.songimage }}></ImageBackground>
          <View style={styles.cardOverlayView}>
            <Text numberOfLines={1} style={styles.songName}>
              {item.item.song_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.charcoal,
                alignSelf: 'center',
              }}>
              {item.item.artistName}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  public renderGenreView = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.selectSingleCategory(item.item);
        }}>
        <Card style={styles.songsCard}>
          <ImageBackground
            style={styles.cardImage}
            source={{ uri: item.item.thumbnail }}
            resizeMode={'cover'}
          // imageStyle={{ borderRadius: 10}}
          ></ImageBackground>
        </Card>
      </TouchableOpacity>
    );
  };

  public showSearchBar = () => {
    this.setState({ showSearchBar: true });
  };
  public onClickSearchItem = (item: any) => {
    this.setState({ showSearchBar: false });
    item.song_category === 'Podcast videos'
      ? this.openVideoScreen(item)
      : this.openSongScreen(item);
  };
  public renderSearchItem = ({ item }) => {
    // console.log('item', item);
    return item.status === '0' &&
      this.props.userRole === UserRole.NORMAL ? null : (
        <TouchableOpacity
          style={{ marginTop: 55, marginLeft: 5 }}
          onPress={() => this.onClickSearchItem(item)}>
          {/* <Text style={{ fontSize: 18, fontFamily: "serif", paddingLeft: 10 }}>{item.song_name}</Text> */}
          <Text style={{ fontSize: 18, paddingLeft: 10 }}>{item.song_name}</Text>
          <Text style={{ paddingLeft: 10, marginTop: 2, fontSize: 12 }}>
            {item.song_category}
          </Text>
          <View
            style={{
              backgroundColor: colors.maroon,
              height: 0.5,
              width: '80%',
              margin: 15,
            }}></View>
        </TouchableOpacity>
      );
  };
  public render() {
    // console.log(this.state.searchText);
    return (
      <Container style={{ backgroundColor: colors.snow }}>
        <CommonHeader
          style={{ height: 1 }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            zIndex: 1000,
          }}>
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Icon
                name={'ios-search'}
                type={'Ionicons'}
                style={{ fontSize: 24, marginLeft: 7, color: colors.charcoal }}
              />

              {/* <Text style={{color:colors.charcoal,fontSize:18,marginLeft:10}}>Apple Music</Text> */}
              <TextInput
                placeholder={'Search a song'}
                placeholderTextColor={colors.charcoal}
                style={{ marginLeft: 10, fontSize: 16, color: 'black', flex: 1 }}
                value={this.state.searchText}
                onChangeText={(text) => {
                  this.props.searchSong(text);
                  this.setState({ searchText: text, showSearchBar: true, showCross: true });
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 0.3
              }}>
              {this.state.showSearchBar && this.props.isSongSearching && (
                <ActivityIndicator
                  style={{
                    // top: Platform.OS == 'android' ? 15 : 45,
                    marginRight: 10,
                  }}
                  color={colors.maroon}
                />
              )}
              {this.state.showCross ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ showSearchBar: false, searchText: '', showCross: false })
                  }
                  style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  <Icon
                    name={'closecircleo'}
                    type={'AntDesign'}
                    style={{
                      fontSize: 12,
                      color: colors.lightMaroon,
                      // top: Platform.OS == 'android' ? 0 : 20,
                    }}></Icon>
                </TouchableOpacity>
              ) : <></>}
            </View>
          </View>

          {/* {!this.state.showSearchBar &&
                    <Button
                        transparent={true}
                        onPress={this.showSearchBar}
                        style={{ width: 100, position: "absolute", top: 10, left: 20, height: 20 }} />} */}
          {}
          {/* {(this.state.showSearchBar && !this.props.isSongSearching) &&
                    <TouchableOpacity onPress={() => this.setState({ showSearchBar: false })} style={{ position: "absolute", top: 15,right:20,zIndex: 10 }}>
                        <Icon name={"closecircleo"} type={"AntDesign"}
                            style={{
                                fontSize: 12, color: colors.lightMaroon,
                                position: "absolute", top: Platform.OS == 'android' ? 0 : 20
                                ,
                            }}></Icon>
                    </TouchableOpacity>
                } */}
          {/* {this.state.showSearchBar && (
            <TextInput
              style={{
                position: 'absolute',
                top: Platform.OS == 'android' ? 0 : 30,
                backgroundColor: colors.snow,
                flex: 1,
                width: '92%',
                padding: 5,
                borderWidth: 0.5,
                borderColor: colors.silver,
                borderRadius: 5,
                borderBottomColor: colors.steel,
                height: 40,
              }}
              placeholder={'Search a song'}
              placeholderTextColor={colors.lightMaroon}
              onChangeText={(text) => this.props.searchSong(text)}></TextInput>
          )} */}
          {this.state.showSearchBar && (
            <View
              style={{
                width: '90%',
                height: 300,
                position: 'absolute',
                top: Platform.OS == 'android' ? 46 : 50,
                backgroundColor: colors.snow,
                zIndex: 1000,
                // alignSelf: 'center',
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.silver,
                borderBottomColor: colors.silver,
              }}>
              {this.props.searchData && this.props.searchData.length ? (
                <FlatList
                  data={this.props.searchData}
                  renderItem={this.renderSearchItem}
                />
              ) : (
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      padding: 30,
                      color: colors.maroon,
                    }}>
                    We could not find any song for your query
                  </Text>
                )}
            </View>
          )}
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: 15,
            flex: 0.9,
            marginBottom: Platform.OS == 'android' ? 60 : 60,
            marginRight: 15,
          }}

          contentContainerStyle={{ paddingBottom: 70 }}>
          {this.renderTextIcon(DataTypes.SONGS, this.props.featuredSongs)}
          {this.renderGenreList(this.props.featuredSongs, DataTypes.SONGS)}
        <Banner />
          {this.renderTextIcon(DataTypes.ALBUMS, this.props.category)}
          {this.renderGenreList(this.props.category, DataTypes.ALBUMS)}
          {/* {this.renderTextIcon(DataTypes.VIDEOS, this.props.featuredVideos)} */}
          {/* {this.renderGenreList(this.props.featuredVideos, DataTypes.VIDEOS)} */}
          {this.renderTextIcon(DataTypes.VIDEOS, this.props.videoCategories)}
          {this.renderGenreList(this.props.videoCategories, DataTypes.VIDEOS)}
          {this.renderTextIcon(DataTypes.PODCASTS, this.props.featuredPodcasts)}
          {this.renderGenreList(
            this.props.featuredPodcasts,
            DataTypes.PODCASTS,
          )}
        </ScrollView>

        {this.props.isSongPlaying && this.props.musicPlayer && (
          <MusicPlayer
            style={styles.musicPlayer}
            hide={false}
            navigation={this.props.navigation}
          />
        )}
        <BottomBar navigation={this.props.navigation} />
      </Container>
    );
  }
}
export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setBottomTab: (btnName) => dispatch(BottomBarActions.setSelectedTab(btnName)),
  setPlaylist: (list) => dispatch(SongsActions.setPlaylist(list)),
  getCategories: () => dispatch(CategoryAction.getCategoryRequest()),
  getHomeData: () => dispatch(CategoryAction.getHomeDataReq()),
  playSong: (song) => dispatch(SongsActions.setSong(song)),
  shouldPlay: (play) => dispatch(SongsActions.setIsPlaying(play)),
  showPlay: (showPlay) => dispatch(SongsActions.showPlaying(showPlay)),
  searchSong: (keyword) => dispatch(SearchAction.searchRequest(keyword)),
  // songCat: () => dispatch(CategoryAction.getSongByCatRequest("Hiphop videos"))
});

export const mapStateToProps = (state: RootState): StateProps => ({
  category: state.category.categoriesData,
  loginToken: state.login.userData,
  featuredSongs: state.category.homeData
    ? state.category.homeData.featuredSongs
    : undefined,
  featuredVideos: state.category.homeData
    ? state.category.homeData.featuredVideos
    : undefined,
  featuredPodcasts: state.category.homeData
    ? state.category.homeData.featuredPodcasts
    : undefined,
  isSongPlaying: state.songs.isPlaying || state.songs.showPlay,
  musicPlayer: state.songs.showPlayer,
  searchData: state.search.searchData,
  isSongSearching: state.search.fetching,
  videoCategories: state.category.homeData
    ? state.category.homeData.videoCategories
    : undefined,
  userRole: state.login.userData.user_cat,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
