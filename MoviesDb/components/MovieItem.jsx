import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'

import { getImgTmdb } from '../api/TMDBApi'

import favIcon from '../img/ic_favorite.png'

export default class MovieItem extends Component {
    render() {
        const { film, displayDetails, isFav } = this.props
        return (
            <TouchableOpacity 
                style={styles.mainContainer}
                onPress={() => displayDetails(film.id)}
            >
                <Image
                    style={styles.image}
                    source={{uri: getImgTmdb(film.poster_path)}}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        { isFav ? ( 
                            <Image
                                style={{ width: 20, height: 20, marginRight: 5, marginTop: 2 }}
                                source={ favIcon }
                                resize
                                Mode='contain'
                            />
                        ) : null }
                        <Text style={styles.title}>{ film.title }</Text>
                        <Text style={styles.vote}>{ film.vote_average }</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} numberOfLines={6}>{ film.overview }</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{ film.release_date }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    contentContainer: {
        flex: 1,
        margin: 5
    },
    headerContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    descriptionContainer: {
        flex: 7
    },
    description: {
        fontStyle: 'italic',
        color: '#666666'
    },
    dateContainer: {
        flex: 1
    },
    date: {
        textAlign: 'right',
        fontSize: 14
    }
})
