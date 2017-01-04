export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';

export default function (action, state = {}) {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    users: true
                }
            };
        case RECEIVE_USERS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    users: false
                },
                users: action.users
            };
        case REQUEST_GROUPS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    groups: true
                }
            };
        case RECEIVE_GROUPS:
            return {
                ...state,
                fetching: {
                    ...state.fetching,
                    groups: false
                },
                groups: action.groups
            };
        default:
            return state;
    }

}