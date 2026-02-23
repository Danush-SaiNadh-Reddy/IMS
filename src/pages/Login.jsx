import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) { 
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setError('');
            onLogin(); 
            navigate('/'); 
        } else {
            setError('Invalid username or password');
        }
    };

    const inputClasses = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A100FF] focus:border-transparent transition-all duration-200";
    const labelClasses = "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white border-t-4 border-[#A100FF] shadow-lg rounded-sm p-8 w-full max-w-md animate-fade-in-up">
                
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Please sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className={labelClasses}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={inputClasses}
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={inputClasses}
                            placeholder="Enter password"
                        />
                    </div>
                    
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm font-bold border-l-4 border-red-500">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#A100FF] hover:bg-[#8500d1] text-white font-bold py-3 px-4 rounded transition-colors duration-300 ease-in-out uppercase tracking-wider mt-4"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;