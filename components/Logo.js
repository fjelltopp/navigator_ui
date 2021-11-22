import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';

export default function Logo() {
    return (
        <span className="text-danger">
            <FontAwesomeIcon icon={faCompass} className="me-2" />
            <span>HIV Estimates Navigator</span>
        </span>
    )
}
