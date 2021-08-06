import React from 'react';
import { ProgressBar, Table } from 'react-bootstrap';

export default function ProgressBanner({ milestones, percentage }) {
    const milestoneStyles = { width: 1400 / (milestones.length) };
    const progressStyles = { borderRadius: 0, height: '0.5rem' };

    return (
        <Table bordered className="text-muted">
            <thead>
                <tr className="text-center">
                    {milestones.map(milestone =>
                        <th style={milestoneStyles}>{milestone}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ padding: 0 }} colspan={milestones.length}>
                        <ProgressBar variant='danger' style={progressStyles} now={percentage} />
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}
