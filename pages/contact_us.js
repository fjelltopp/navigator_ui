import { Trans } from '@lingui/react';
import { Layout } from '../components/Layout'

function MailTo({ email }) {
    return <a href={`mailto:${email}`} className="link-danger">{email}</a>
}

function GeneralSupportEmailAddress() {
    return <MailTo email="estimates@unaids.org" />
}

export function TechnicalSupportEmailAddress() {
    return <MailTo email="support@fjelltopp.org" />
}

export default function ContactUsPage() {
    return (
        <div id="ContactUsPage">
            <Layout>
                <h3 className="text-danger text-center"><Trans id="Contact Us" /></h3>
                <hr />
                <p><Trans id="UNAIDS and its partners are committed to providing the highest level of support to country teams using its platforms and models during the estimates process. You can contact us in one of two ways:" /></p>
                <p><Trans id="For questions about the estimates process or to provide feedback to UNAIDS about task descriptions found in the Navigator, please contact <0>GeneralSupportEmailAddress</0>. If you are commenting on a specific task, be sure to capture a screenshot or copy and paste the text in question." components={[<GeneralSupportEmailAddress />]} /></p>
                <p><Trans id="To report bugs or problems or to provide feedback about the Navigator software, please contact <0>TechnicalSupportEmailAddress</0>. If relevant capture a screenshot of the error you are receiving or the task in question." components={[<TechnicalSupportEmailAddress />]} /></p>
                <p><Trans id="If you need help materials and guides or training materials for the HIV epidemiological estimates process, you can visit our library of HIV estimates training materials." /></p>
            </Layout>
        </div>
    )
}
