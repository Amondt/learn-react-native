import { createStore } from 'redux'

import toggleFav from './reducers/favReducer'

export default createStore(toggleFav)