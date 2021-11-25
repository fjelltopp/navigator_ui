import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, logoutApiRequest } from '../lib/api';
import ErrorPagePopup from '../components/ErrorPagePopup';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function LogoutPage() {
    const [{ loading, error }] = useAxios(logoutApiRequest);

    if (loading) {
        return 'Logging out...'
    } else if (error) {
        return <ErrorPagePopup apiError={error} />
    } else {
        window.location.href = '/';
        return null;
    }

}
