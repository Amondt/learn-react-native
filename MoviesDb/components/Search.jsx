import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Keyboard, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { getMoviesTmdbBySearch } from '../api/TMDBApi'

import MovieItem from './MovieItem'

class Search extends Component {
    state = {
        films: [],
        isLoading: false
    }

    searchedInput = ''
    page = 0
    totalPages = 0

    loadFilms() {
        Keyboard.dismiss()
        this.setState({ isLoading: true })
        if (this.searchedInput.length > 0) {
            getMoviesTmdbBySearch(this.searchedInput, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ films: [ ...this.state.films, ...data.results ], isLoading: false })
            })
        }
    }

    updateSearchInput(input) {
        this.searchedInput = input
    }

    searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this.loadFilms()
        })
    }

    displayDetails = (idMovie) => {
        console.log("Display film with id " + idMovie)
        this.props.navigation.navigate('MovieDetails', { idMovie })
    }

    render() {
        const { films } = this.state
        const { favMovies } = this.props
        return (
            <View style={styles.mainContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Titre du film"
                    onChangeText={(input) => this.updateSearchInput(input)}
                    onSubmitEditing={() => this.searchFilms()}
                />
                <Button title="Search" onPress={() => {this.searchFilms()}} />
                <FlatList
                    data={ films }
                    keyExtractor={ item => item.id.toString()}
                    renderItem={ ({item}) => <MovieItem film={item} displayDetails={this.displayDetails} isFav={ favMovies.indexOf(item.id) === -1 ? false : true } /> }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this.loadFilms()
                        }
                    }}
                />
                { this.state.isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View>
                ) : null }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favMovies: state.favMovies
    }
}

export default connect(mapStateToProps)(Search)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    textInput: {
        height: 50,
        paddingLeft: 5
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
