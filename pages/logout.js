import { useRouter } from 'next/router'
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, logoutRequest } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function LogoutPage() {
    const router = useRouter()

    const [{ loading, error }] = useAxios(logoutRequest);

    if (loading) {
        return 'Logging out...'
    } else if (error) {
        return 'Logout Error'
    } else {
        router.push('/');
        return null;
    }

}
