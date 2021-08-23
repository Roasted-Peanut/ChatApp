
import * as Types from '../../actionTypes/index';
export const appintro = () => ({
    type: Types.APPINTRO,
});

export const login = (myid,status) => ({
    type: Types.LOGIN,
    myid,
    status

});

export const logout =() => ({
    type: Types.LOGOUT,
   
})
