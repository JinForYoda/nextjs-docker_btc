import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers/rootReducer'

// initial states here
const initalState = {
	USD: {
		code: 'USD',
		symbol: '&#36;',
		rate: '',
		description: 'United States Dollar',
		rate_float: 0,
	},
	GBP: {
		code: 'GBP',
		symbol: '&pound;',
		rate: '',
		description: 'British Pound Sterling',
		rate_float: 0,
	},
	EUR: {
		code: 'EUR',
		symbol: '&euro;',
		rate: '',
		description: 'Euro',
		rate_float: 0,
	},
}

// middleware
const middleware = [thunk]

// creating store
export const store = createStore(
	rootReducer,
	initalState,
	composeWithDevTools(applyMiddleware(...middleware))
)

// assigning store to next wrapper
const makeStore = () => store

export const wrapper = createWrapper(makeStore)
