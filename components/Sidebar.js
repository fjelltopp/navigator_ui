import Link from 'next/link'
import { ListGroup } from 'react-bootstrap';

export default function Sidebar() {

    const sidebarLinks = [
        { label: 'Home', href: '/' },
        { label: 'My Profile', href: '/profile' },
        { label: 'HIV Tools', href: 'https://hivtools.unaids.org' },
        { label: 'Training Resources', href: 'https://hivtools.unaids.org' },
        { label: 'Help', href: 'https://hivtools.unaids.org' },
        { label: 'Logout', href: 'https://example.com/' } // TODO: configure
    ];

    const listItem = (link, key) => {
        if (link.href.includes('http')) {
            return (
                <ListGroup.Item
                    action
                    key={key}
                    onClick={() => window.open(link.href, '_blank')}>
                    <span>{link.label}</span>
                </ListGroup.Item>
            )
        } else {
            return (
                <Link href={link.href} key={key}>
                    <ListGroup.Item action>{link.label}</ListGroup.Item>
                </Link>
            )
        }
    }

    return (
        <ListGroup variant="flush">
            {sidebarLinks.map((link, index) => listItem(link, index))}
        </ListGroup>
    )

}