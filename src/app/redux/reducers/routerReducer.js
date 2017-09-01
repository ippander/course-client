import {
  // Userdata,
  Actions,
  ActionTypes,
  LoginAction,
  PayloadAction
} from '../actions';

export interface UIState {
	fetching: boolean
}

export const INITIAL_UI_STATE: UIState = {
	fetching: false
}

export const uiReducer = (state = INITIAL_UI_STATE, action: Actions): UIState => {

	switch (action.type) {

	}

	return state
}