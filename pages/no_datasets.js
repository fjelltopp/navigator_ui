import Link from 'next/link'
import { ButtonGroup, Button } from 'react-bootstrap';
import { LogInLayout } from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

export default function NoDatasetsPage() {

    return (
        <LogInLayout>
            <h3>Dataset Error</h3>
            <hr />
            <p>Your ADR account does not have any Inputs Datasets associated with it. Please make sure you are logged into the correct account and have permission to edit an Inputs  Dataset.</p>
            <ButtonGroup size="sm">
                <Link href={'/'}>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                        <span>Refresh Page</span>
                    </Button>
                </Link>
                <Link href={'/logout'}>
                    <Button variant="outline-danger">Log Out</Button>
                </Link>
            </ButtonGroup>
        </LogInLayout>
    )

}
