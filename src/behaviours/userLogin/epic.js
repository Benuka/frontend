import { from, of } from 'rxjs';
import axios from 'axios';
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_SIGNIN_FAIL,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL
} from './constants';

export const userLoginEpic = action$ =>
	action$.pipe(
		ofType(USER_SIGNIN_REQUEST),
		mergeMap(action => from(axios.post('https://thawing-caverns-78160.herokuapp.com/api/users/signIn', { email: action.payload.email, password: action.payload.password }))
			.pipe(
				map(response => {
					localStorage.setItem('userInfo', JSON.stringify(response.data));
					return {
						type: USER_SIGNIN_SUCCESS,
						payload: response.data,
					};
				}),
				catchError((error) => of({
					type: USER_SIGNIN_FAIL,
					payload: error.response && error.response.data.message ? error.response.data.message : error.message,
				})
				)
			)
		));

export const userSignUpEpic = action$ =>
	action$.pipe(
		ofType(USER_REGISTER_REQUEST),
		mergeMap(action => from(axios.post('https://thawing-caverns-78160.herokuapp.com/api/users/signUp', { email: action.payload.email, name: action.payload.name, password: action.payload.password }))
			.pipe(
				map(response => ({
					type: USER_REGISTER_SUCCESS,
					payload: response,
				})),
				catchError((error) => of({
					type: USER_REGISTER_FAIL,
					payload: error.response,
				})
				)
			)
		));