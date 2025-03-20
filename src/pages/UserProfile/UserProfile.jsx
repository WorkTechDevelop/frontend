import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    return (
        <Link to='/user-info' data-testid="user-info">
            Профиль
        </Link>
    );
};

export default UserProfile;