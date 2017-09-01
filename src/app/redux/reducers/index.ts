import { combineReducers } from 'redux'

import { sessionReducer, SessionState, INITIAL_SESSION_STATE } from './sessionReducer'
import { uiReducer, UIState, INITIAL_UI_STATE } from './uiReducer'
import { appReducer, CourseState, INITIAL_COURSE_STATE } from './appReducer'
import { routerReducer } from '@angular-redux/router'

export * from './appReducer'

export interface AppState {
	courses: CourseState,
	ui: UIState,
	session: SessionState
}

export const INITIAL_APP_STATE: AppState = {
	courses: INITIAL_COURSE_STATE,
	ui: INITIAL_UI_STATE,
	session: INITIAL_SESSION_STATE
}

export const rootReducer = combineReducers<AppState>({
	session: sessionReducer,
	courses: appReducer,
	ui: uiReducer,
	router: routerReducer
})
