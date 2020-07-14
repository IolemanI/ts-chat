import { actions } from '../reducers/account.reducer';
import AccountDAO from '../../api/AccountDAO';

export const login = () => async dispatch => {
  let name: string;
  
  try {
    const res = await AccountDAO.login();

    if (res.status !== 200) throw new Error('Login failed.')  
    name = res.data.name;
    
    await dispatch(actions.setName(name));
    return name;
  } catch (e) {
    console.error(e.message, e);
    await dispatch(actions.setError(e.message));
  }
};
