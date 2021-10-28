import React from 'react';
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.push('/')}>
                Login
            </button>
        </div>
    );
}