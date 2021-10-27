import { from, of } from 'rxjs';
import axios from 'axios';
import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_REGISTER_REQUEST } from './constants';

export const userLoginEpic = action$ =>
	action$.pipe(
		ofType(USER_SIGNIN_REQUEST),
		mergeMap(action => from(axios.post('api/users/signIn', { email: action.payload.email, password: action.payload.password }))
			.pipe(
				map(response => ({
					type: USER_SIGNIN_SUCCESS,
					payload: response.data,
				})),
				catchError((error) => of({
					type: 'FAIL',
					payload: error,
				})
				)
			)
		));

export const userSignUpEpic = action$ =>
	action$.pipe(
		ofType(USER_REGISTER_REQUEST),
		mergeMap(action => from(axios.get('api/getName'))
			.pipe(
				map(response => ({
					type: USER_SIGNIN_SUCCESS,
					payload: response,
				})),
				catchError(() => ({
					type: 'FAIL',
					payload: error.xhr.response,
				})
				)
			)
		));