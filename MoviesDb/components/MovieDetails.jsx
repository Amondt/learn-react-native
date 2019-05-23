import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Image, Dimensions, Platform, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import moment from 'moment'
import numeral from 'numeral'
import PercentageCircle from 'react-native-percentage-circle'
import Icon from 'react-native-vector-icons/Ionicons'

import favIcon from '../img/ic_favorite.png'
import favIconBorder from '../img/ic_favorite_border.png'

import { getMovieDetails, getBackdropImgTmdb } from '../api/TMDBApi'

class MovieDetails extends Component {
    static navigationOptions = ( { navigation } ) => {
        const styles = {
            favoriteContainer: {
                alignItems: 'center',
                marginRight: 20,
            },
            favoriteImg: {
                width: 30,
                height: 30
            }
        }
        let toggleFav = navigation.getParam('toggleFav')
        let favMovies = navigation.getParam('favMovies')
        let currentFilm = navigation.getParam('currentFilm')

        let title = 'Details'
        let headerRight = (
            <TouchableOpacity 
                style={styles.favoriteContainer}
                onPress={ () => { toggleFav(currentFilm) } }
            >
                <Image
                    style={styles.favoriteImg}
                    source={
                        favMovies && favMovies.length > 0 ? (
                            favMovies.indexOf(currentFilm) !== -1 ? favIcon : favIconBorder
                        ) : favIconBorder
                    }
                    resize
                    Mode='contain'
                />
            </TouchableOpacity>
        )
        return { title, headerRight }
    }

    constructor(props) {
        super(props)
        this.state = {
            film: null,
            isLoading: true
        }
    }

    componentDidMount() {
        getMovieDetails(this.props.navigation.getParam('idMovie')).then(data => {
            const { toggleFav, favMovies, navigation  } = this.props
            navigation.setParams({ toggleFav, favMovies, currentFilm: data.id })
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    // componentDidUpdate() {
    //     const { toggleFav, favMovies, navigation  } = this.props
    //     favMovies && favMovies.length > 0 ? (
    //         navigation.setParams({ toggleFav, favMovies, currentFilm: this.state.film.id })
    //     ) : null
    // }
    
    render() {
        const { film, isLoading } = this.state
        return (
            <View style={ styles.mainContainer }>
                { isLoading || film === null ? (
                    <View style={ styles.loadingContainer }>
                        <ActivityIndicator size='large' />
                    </View>
                ) : (
                    <ScrollView style={ styles.scrollviewContainer }>
                        <Image
                            style={ styles.image }
                            source={ { uri: getBackdropImgTmdb(film.backdrop_path) } }
                            resizeMode='contain'
                        />

                        <Text style={ styles.title }>{ film.title }</Text>

                        <Text style={ styles.releaseDate }>({ moment(film.release_date).format('MMMM YYYY') })</Text>

                        <View style={ styles.reviewContainer }>
                            <View style={ styles.reviewPercentContainer }>
                                <View style={ styles.reviewPercentContent }>
                                    <PercentageCircle
                                        radius={ 20 }
                                        percent={ film.vote_average * 10 }
                                        color={ '#3498db' }
                                        borderWidth={ 4 }
                                        textStyle={{ fontSize: 16 }}
                                    ></PercentageCircle>
                                </View>
                                <Text style={ styles.reviewTitles }>User{'\n'}Score</Text>
                            </View>

                            <View style={ styles.reviewSubContainer }>
                                <View style={ styles.reviewIcon }>
                                    <Icon
                                        name={ Platform.OS === 'ios' ? 'ios-heart' : 'md-heart' }
                                        color='#3498db'
                                        size={ 35 }
                                    />
                                </View>
                                <View>
                                    <Text style={ styles.reviewTitles }>Votes</Text>
                                    <Text style={ styles.reviewVotesContent }>{ film.vote_count }</Text>
                                </View>
                            </View>

                            <View style={ styles.reviewSubContainer }>
                                <View style={ styles.reviewIcon }>
                                    <Icon
                                        name={ Platform.OS === 'ios' ? 'ios-heart' : 'md-wallet' }
                                        color='#3498db'
                                        size={ 35 }
                                    />
                                </View>
                                <View>
                                    <Text style={ styles.reviewTitles }>Budget</Text>
                                    <Text style={ styles.reviewbudgetContent }>{ numeral(film.budget).format('(0.00 a)') }</Text>
                                </View>
                            </View>
                        </View>

                        <View style={ styles.overviewContainer }>
                            <Text style={ styles.subTitle }>Overview</Text>
                            <Text style={ styles.overviewContent }>{ film.overview }</Text>
                        </View>

                        <View style={ styles.genresContainer }>
                            { film.genres.map(genre => (
                                <Text 
                                    key={ genre.name }
                                    style={ styles.genreName}
                                >
                                    { genre.name }
                                </Text>
                            ))}
                        </View>

                        <View style={ styles.companiesContainer }>
                            <Text style={ styles.subTitle }>Companies</Text>
                            { film.production_companies.map(company => (
                                <Text
                                    key={ company.name }
                                    style={ styles.companiesContent }
                                >
                                    { company.name }
                                </Text>
                            )) }
                        </View>
                        <View style={{ marginBottom: 40,}}></View>
                    </ScrollView>
                )}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favMovies: state.favMovies
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFav: (filmId) => dispatch({ type: 'TOGGLE_FAV', filmId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollviewContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    image: {
        width: Dimensions.get('window').width - 10,
        height: Math.round(Dimensions.get('window').width * 9 / 16),
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    title: {
        color: '#555',
        textAlign: 'center',
        fontSize: 30,
    },
    releaseDate: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        marginBottom: 20,
    },
    reviewContainer: {
        flex: 1,
        marginBottom: 15,
        flexDirection: 'row',
    },
    reviewPercentContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    reviewPercentContent: {
        marginRight: 5,
    },
    reviewTitles: {
        color: '#555',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    reviewSubContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    reviewVotesContent: {
        color: 'gray'
    },
    reviewIcon: {
        marginRight: 5,
        marginTop: 5,
    },
    reviewbudgetContent: {
        color: 'gray'
    },
    overviewContainer: {
        marginBottom: 10,
    },
    overviewContent: {
        color: 'gray',
        marginBottom: 10,
    },
    genresContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    genreName: {
        backgroundColor: '#ddd',
        color: '#555',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        marginLeft: 3,
        marginTop: 3,
        borderRadius: 3,
        width: 110,
        textAlign: 'center'
    },
    companiesContent: {
        marginLeft: 10,
        color: 'gray'
    },
    subTitle: {
        color: '#555',
        fontSize: 18,
    }
})