import { Layout } from '../components/Layout'
export default function ContactUsPage() {

    const mailTo = email => (
        <a href={`mailto:${email}`} className="link-danger">{email}</a>
    )

    return (
        <div id="ContactUsPage">
            <Layout>
                <h3 className="text-danger text-center">Contact Us</h3>
                <hr />
                <p>UNAIDS and its partners are committed to providing the highest level of support to country teams using its platforms and models during the estimates process. You can contact us in one of two ways:</p>
                <p>For questions about the estimates process or to provide feedback to UNAIDS about task descriptions found in the Navigator, please contact {mailTo('estimates@unaids.org')}. If you are commenting on a specific task, be sure to capture a screenshot or copy and paste the text in question.</p>
                <p>To report bugs or problems or to provide feedback about the Navigator software, please contact {mailTo('support@fjelltopp.org')}. If relevant capture a screenshot of the error you are receiving or the task in question.</p>
                <p>If you need help materials and guides or training materials for the HIV epidemiological estimates process, you can visit our library of HIV estimates training materials.</p>
            </Layout>
        </div>
    )

}
