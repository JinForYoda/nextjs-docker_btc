import { SET_PRICE, PRICE_ERROR } from '../actions/types'

const initialState = {
	price: null,
	loading: true,
}

export default function btcReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRICE:
			return {
				...state,
				price: action.payload,
				loading: false,
			}
		case PRICE_ERROR:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
