import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user } = useAuth0();
    const email = user;
    const emailAvatar = user.charAt( 0 );

    return (
        <>
            { emailAvatar }
            { email }
        </>
    );  
};


export default Profile;