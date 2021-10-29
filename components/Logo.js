import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';

export default function Logo() {
    return (
        <span className="text-danger">
            <FontAwesomeIcon icon={faCompass} />
            <span> UNAIDS Tools Navigator</span>
        </span>
    )
}