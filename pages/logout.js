import { useRouter } from 'next/router'
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, logoutApiRequest } from '../lib/api';
import ErrorPagePopup from '../components/ErrorPagePopup';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function LogoutPage() {
    const router = useRouter()

    const [{ loading, error }] = useAxios(logoutApiRequest);

    if (loading) {
        return 'Logging out...'
    } else if (error) {
        return <ErrorPagePopup apiError={error} />
    } else {
        router.push('/');
        return null;
    }

}
