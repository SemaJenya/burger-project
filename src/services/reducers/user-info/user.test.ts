import {
    initialState,
    fetchRegistration,
    fetchLoginUser,
    checkUserAuth,
    fetchLogout,
    fetchChangeProfile,
    authCheck
} from './user';
import registrationReducer from './user';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(registrationReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle authCheck reducer', () => {
        const state = registrationReducer(initialState, { type: authCheck.type });
        expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });

    it('should handle fetchRegistration.pending reducer', () => {
        const state = registrationReducer(initialState, { type: fetchRegistration.pending.type });
        expect(state).toEqual({ ...initialState, registerUserRequest: true, registerUserError: null });
    });

    it('should handle fetchLoginUser.pending reducer', () => {
        const state = registrationReducer(initialState, { type: fetchLoginUser.pending.type });
        expect(state).toEqual({ ...initialState, loginUserRequest: true, loginUserError: null });
    });

    it('should handle checkUserAuth.pending reducer', () => {
        const state = registrationReducer(initialState, { type: checkUserAuth.pending.type });
        expect(state).toEqual({ ...initialState, getUserRequest: true, getUserError: null });
    });

    it('should handle fetchRegistration.fulfilled reducer', () => {
        const userData = {
            email: 'semajenya@gmail.com',
            name: 'Jane'
        }

        const state = registrationReducer(initialState, { type: fetchRegistration.fulfilled.type, payload: userData });
        expect(state).toEqual({ ...initialState, getUserRequest: false, data: userData });
    });

    it('should handle fetchLoginUser.fulfilled reducer', () => {
        const userData = {
            email: 'semajenya@gmail.com',
            name: 'Jane'
        }

        const state = registrationReducer(initialState, { type: fetchLoginUser.fulfilled.type, payload: userData });
        expect(state).toEqual({ ...initialState, loginUserRequest: false, data: userData });
    });

    it('should handle checkUserAuth.fulfilled reducer', () => {
        const userData = {
            email: 'semajenya@gmail.com',
            name: 'Jane'
        }

        const state = registrationReducer(initialState, { type: checkUserAuth.fulfilled.type, payload: userData });
        expect(state).toEqual({ ...initialState, getUserRequest: false, data: userData });
    });

    it('should handle fetchLogout.fulfilled reducer', () => {
        const state = registrationReducer(initialState, { type: fetchLogout.fulfilled.type });
        expect(state).toEqual({ ...initialState, data: null });
    });

    it('should handle fetchChangeProfile.fulfilled reducer', () => {

        const firstState = {
            isAuthChecked: false, //попытка проверки пользователя. Может быть удачной или нет. True - если была попытка. Отвечает за прелоудер

            data: {
                email: 'semajenya69.gmail.com',
                name: 'Jane'
            },

            isLoading: false,
            error: null,

            registerUserError: null,
            registerUserRequest: false,

            loginUserError: null,
            loginUserRequest: false,

            getUserError: null,
            getUserRequest: false
        }

        const newData = {
            email: 'popka.gmail.com',
            name: 'Popka'
        }

        const state = registrationReducer(firstState, { type: fetchChangeProfile.fulfilled.type, payload: newData });
        expect(state).toEqual({ ...initialState, data: newData });
    });

    it('should handle fetchRegistration.rejected reducer', () => {
        const state = registrationReducer(initialState, { type: fetchRegistration.rejected.type, payload: 'Error' });
        expect(state).toEqual({ ...initialState, registerUserRequest: false, registerUserError: 'Error' });
    });

    it('should handle fetchLoginUser.rejected reducer', () => {
        const state = registrationReducer(initialState, { type: fetchLoginUser.rejected.type, payload: 'Error' });
        expect(state).toEqual({ ...initialState, loginUserRequest: false, loginUserError: 'Error' });
    });

    it('should handle checkUserAuth.rejected reducer', () => {
        const state = registrationReducer(initialState, { type: checkUserAuth.rejected.type, payload: 'Error' });
        expect(state).toEqual({ ...initialState, getUserRequest: false, getUserError: 'Error' });
    });

})
