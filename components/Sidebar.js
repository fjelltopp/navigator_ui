import Link from 'next/link';
import { Trans } from '@lingui/react';
import { ListGroup } from 'react-bootstrap';
import LocaleSelector from './LocaleSelector';

export default function Sidebar() {

    const sidebarLinks = [
        { label: <Trans id="What's Next?" />, href: '/' },
        { label: <Trans id="Task List" />, href: '/tasks' },
        { label: <Trans id="How to use Navigator" />, href: 'https://hivtools.unaids.org/wp-content/uploads/G.13-How-to-use-the-ADR-Navigator.mp4' },
        { label: <Trans id="HIV Tools" />, href: 'https://hivtools.unaids.org' },
        { label: <Trans id="Contact Us" />, href: '/contact_us' },
        { label: <Trans id="Log Out" />, href: '/logout' }
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
        <>
            <ListGroup variant="flush" className="mb-auto">
                {sidebarLinks.map((link, index) => listItem(link, index))}
            </ListGroup>
            <ListGroup variant="flush">
                <LocaleSelector />
            </ListGroup>
        </>
    )

}