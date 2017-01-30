/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import MusicControl from 'react-native-music-control';
import Sound from 'react-native-sound';

export default class AwesomeProject extends Component {
  constructor(props){
    super(props)
    this.state = { play: false }
    this.displayInfo = this.displayInfo.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }
  componentDidMount(){
    MusicControl.enableBackgroundMode(true);
    this.whoosh = new Sound('nodiggity.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('Sound loaded');
      }
    });
    console.warn('ok')

    MusicControl.on('play', this.play)
    MusicControl.on('pause', this.pause)
  }

  play(){
    this.whoosh.play((success) => {
      if (success) {
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    MusicControl.setNowPlaying({
      title: 'Billie Jean',
      artwork: 'https://i.imgur.com/e1cpwdo.png',
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      duration: this.whoosh.getDuration(),
      description: 'Billie Jean is a song by American singer Michael Jackson. It is the second single from the singer\'s sixth solo album, Thriller (1982). It was written and composed by Jackson and produced by Jackson and Quincy Jones.',
      date: '1983-01-02T00:00:00Z',
      rating: 84
    })
    MusicControl.enableControl('play', false)
    MusicControl.enableControl('pause', true)


    this.setState({
      play: true
    })
  }

  pause(){
    this.whoosh.pause()
    MusicControl.enableControl('play', false)
    MusicControl.enableControl('pause', true)
    this.setState({
      play: false
    })
  }

  displayInfo(){
    if(!this.state.play){
      this.play()
    } else {
      this.pause()
    }
  }
  render() {
    const label = this.state.play ? "PAUSE SONG" : "PLAY SONG"

    return (
      <View style={styles.container}>
        <Button
          onPress={this.displayInfo}
          title={label}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
