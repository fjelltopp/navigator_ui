import Link from 'next/link'
import { ListGroup } from 'react-bootstrap';

export default function Sidebar() {

    const sidebarLinks = [
        { label: 'Home', href: '/' },
        { label: 'My Profile', href: '/profile' },
        { label: 'HIV Tools', href: 'https://hivtools.unaids.org' },
        { label: 'Training Resources', href: 'https://hivtools.unaids.org' },
        { label: 'Help', href: 'https://hivtools.unaids.org' },
        { label: 'Logout', href: '/logout' }
    ];

    const listItem = (link, key) => {
        // TODO: figure out why we need this strange work around to get
        // the logout page to open without calling AuthWrapper.js
        const isLogoutLink = link.href === '/logout';
        if (link.href.includes('http') || isLogoutLink) {
            const handleClick = () =>
                window.open(link.href, isLogoutLink ? '_self' : '_blank');
            return (
                <ListGroup.Item
                    action
                    key={key}
                    onClick={handleClick}>
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