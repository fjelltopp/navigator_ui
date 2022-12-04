import { t } from "@lingui/macro";
import Link from "next/link";
import { ButtonGroup, Button } from "react-bootstrap";
import { LogInLayout } from "@/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function UserNotFoundInAdrPage() {
  return (
    <LogInLayout>
      <h3>{t`Current user has not been found in ADR.`}</h3>
      <hr />
      <p>{t`Your SSO account has not yet been used to log in to the ADR. Please use the "Go to ADR" button below to
      visit ADR and get your account created.
       Then come back here and click "Refresh Page".`}</p>
      <ButtonGroup size="sm">
        <a href={`${process.env.NEXT_PUBLIC_CKAN_SITE_URL}/user/saml2login`} target="_blank">
          <Button variant="danger">{t`Go to ADR`}</Button>
        </a>
      </ButtonGroup>
      <br />
      <br />
      <ButtonGroup size="sm">
        <Link href={"/"}>
          <Button variant="outline-danger">
            <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
            <span>{t`Refresh Page`}</span>
          </Button>
        </Link>
        <Link href="/api/auth/logout">
          <Button variant="outline-danger">{t`Log Out`}</Button>
        </Link>
      </ButtonGroup>

    </LogInLayout>
  );
}
