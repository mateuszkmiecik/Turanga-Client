export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export default function (action, state = {}) {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                fetching: true
            };
        case RECEIVE_USERS:
            return {
                ...state,
                fetching: false,
                users: action.users
            };
        default:
            return state;
    }

}