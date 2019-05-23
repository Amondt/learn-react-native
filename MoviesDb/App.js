import React from 'react'
import { StyleSheet, View } from 'react-native'

import Navigation from './navigation/Navigation'
import { Provider } from 'react-redux'
import store from './store/configureStore'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <View style={styles.container}>
                    <Navigation />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe'
    },
})
