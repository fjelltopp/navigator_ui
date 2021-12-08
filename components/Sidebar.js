import Link from 'next/link'
import { ListGroup, Badge } from 'react-bootstrap';

export default function Sidebar() {

    const workInProgress = label => {
        const badgeStyle = {
            opacity: 0.5,
            fontWeight: 'normal'
        }
        return (
          <>
              <span>{label} </span>
              <Badge bg="danger" style={badgeStyle}>WIP</Badge>
          </>
        )
    };

    const sidebarLinks = [
        { label: "What's Next?", href: '/' },
        { label: workInProgress('Task List'), href: '/tasks' },
        { label: 'How to use Navigator', href: 'https://hivtools.unaids.org/wp-content/uploads/G.13-How-to-use-the-ADR-Navigator.mp4' },
        { label: 'HIV Tools', href: 'https://hivtools.unaids.org' },
        { label: 'Contact Us', href: '/contact_us' },
        { label: 'Log Out', href: '/logout' }
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
                    key={key}
                    action
                    onClick={handleClick}>
                    <span>{link.label}</span>
                </ListGroup.Item>
            )
        } else {
            return (
                <Link key={key} href={link.href}>
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