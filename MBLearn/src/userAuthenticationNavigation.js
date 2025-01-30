import { useNavigate } from 'react-router-dom';

const userAuthenticationNavigation = () => {

    const logout = () => {
        console.log('User is inactive');
        if(!localStorage.getItem('ACCESS_TOKEN')){
            return;
        }
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LAST_ACTIVITY');
        window.location.href ='/login';
    }

    return logout
}

export default userAuthenticationNavigation
