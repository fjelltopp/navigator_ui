import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function LoadingBanner() {
    return (
        <Offcanvas show={true} placement="top" keyboard={false}>
            <Offcanvas.Body className="text-center">
                <h2 className="text-danger">
                    <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
                    <span>Please wait...</span>
                </h2>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
