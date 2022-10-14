import { t } from '@lingui/macro';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ListGroup } from 'react-bootstrap';
import LocaleSelector from './LocaleSelector';

export default function Sidebar() {
    const router = useRouter();

    const sidebarLinks = [
        { label: t`What's Next?`, href: '/' },
        { label: t`Task List`, href: '/tasks' },
        { label: t`How to use Navigator`, href: '/instructions' },
        { label: t`HIV Tools`, href: 'https://hivtools.unaids.org' },
        { label: t`Contact Us`, href: '/contact_us' },
        { label: t`Log Out`, href: '/api/auth/logout' }
    ];

    const listItem = (link, key) => {
        if (link.href.includes('http')) {
            return (
                <ListGroup.Item
                    key={key}
                    action
                    onClick={() => window.open(link.href, '_blank')}>
                    <span>{link.label}</span>
                </ListGroup.Item >
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
                <LocaleSelector drop="up" />
            </ListGroup>
        </>
    )

}
