import { Trans } from '@lingui/react';
import Link from 'next/link'
import { ButtonGroup, Button } from 'react-bootstrap';
import { LogInLayout } from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

export default function NoDatasetsPage() {

    return (
        <LogInLayout>
            <h3><Trans id="No Country HIV Estimates Datasets found." /></h3>
            <hr />
            <p><Trans id="Your ADR account does not have access to any Country HIV Estimates Datasets. Please make sure you are logged into the correct account and you are added as an editor member of the country organisation or a dataset collaborator." /></p>
            <ButtonGroup size="sm">
                <Link href={'/'}>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                        <Trans id="Refresh Page" />
                    </Button>
                </Link>
                <Link href={'/logout'}>
                    <Button variant="outline-danger"><Trans id="Log Out" /></Button>
                </Link>
            </ButtonGroup>
        </LogInLayout>
    )

}
