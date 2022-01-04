import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function LoadingComponent() {
    return (
        <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
            <span>Please wait...</span>
        </h2>
    )
}
