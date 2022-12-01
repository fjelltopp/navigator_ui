import { t } from "@lingui/macro";
import Link from "next/link";
import { ButtonGroup, Button } from "react-bootstrap";
import { LogInLayout } from "@/components/Layout";

export default function UserNotFoundInAdrPage() {
  return (
    <LogInLayout>
      <h3>{t`Current user has not been found in ADR.`}</h3>
      <hr />
      <p>{t`Your ADR account has not yet been used to log into ADR. Please log into ADR and come back here.`}</p>
        <Link href={process.env.NEXT_PUBLIC_CKAN_SITE_URL + "/user/saml2login"}>
          <Button variant="outline-danger">{t`Log into ADR`}</Button>
        </Link>

    </LogInLayout>
  );
}
