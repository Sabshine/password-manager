import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    passwords: [],
    loading: false,
    searching: false,
};

const addPassStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const addPassSuccess = ( state, action ) => {
    const newPass = updateObject( action.passData, { id: action.passId } );
    return updateObject( state, {
        loading: false,
        passwords: state.passwords.concat( newPass )
    } );
};

const addPassFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchPassStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPassSuccess = ( state, action ) => {
    return updateObject( state, {
        passwords: action.passwords,
        loading: false
    } );
};

const fetchPassFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PASS_START: return addPassStart( state, action );
        case actionTypes.ADD_PASS_SUCCESS: return addPassSuccess( state, action )
        case actionTypes.ADD_PASS_FAIL: return addPassFail( state, action );
        case actionTypes.FETCH_PASS_START: return fetchPassStart( state, action );
        case actionTypes.FETCH_PASS_SUCCESS: return fetchPassSuccess( state, action );
        case actionTypes.FETCH_PASS_FAIL: return fetchPassFail( state, action );
        default: return state;
    }
};

export default reducer;