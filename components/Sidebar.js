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
        if (link.href) {
            return (
                <Link href={link.href} key={key}>
                    <ListGroup.Item action>{link.label}</ListGroup.Item>
                </Link>
            )
        } else if (link.onClick) {
            return <ListGroup.Item action key={key} onClick={link.onClick}>{link.label}</ListGroup.Item>
        }
    }

    return (
        <ListGroup variant="flush">
            {sidebarLinks.map((link, index) => listItem(link, index))}
        </ListGroup>
    )

}