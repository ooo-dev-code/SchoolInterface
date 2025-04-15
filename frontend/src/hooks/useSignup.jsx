import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, password, role, subjects, classes) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:5000/user/register', {
                username,
                password, 
                role, 
                subjects, 
                classes
            });
    
            setIsLoading(false);
    
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'Signup failed');
            console.error(err);
        }
    };    

    return { signup, isLoading, error };
}