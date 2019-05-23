import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../components/Search'
import MovieDetails from '../components/MovieDetails'

const App = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Search'
        }
    },
    MovieDetails: {
        screen: MovieDetails,
    },
})

export default createAppContainer(App)