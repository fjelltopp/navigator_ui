import { t } from '@lingui/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';

export default function Logo() {
    return (
        <span className="text-danger">
            <FontAwesomeIcon icon={faCompass} className="me-2" />
            <span>{t`HIV Estimates Navigator`}</span>
        </span>
    )
}
