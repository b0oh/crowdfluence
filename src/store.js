
import rootReducer from './reducer.js'

const initialState = {}
const enhancers = []
const middleware = []

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
)
