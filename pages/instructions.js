import { Layout } from '../components/Layout';

export default function InstructionsPage() {
    return (
        <Layout>
            <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/l0Ohm1KCYEc?rel=0"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </Layout>
    )
}
