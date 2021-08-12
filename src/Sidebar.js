import React from 'react';
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faUser, faFirstAid, faQuestion, faBook } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar({ user }) {
    return (
        <>
            <h4 className="text-danger text-center">
                <FontAwesomeIcon icon={faCompass} />
                <span> HIV Tools Navigator</span>
            </h4>
            <hr />
            <ListGroup variant="flush">
                {[
                    { label: 'My Account', icon: faUser },
                    { label: 'HIV Tools', icon: faFirstAid },
                    { label: 'Training Resources', icon: faBook },
                    { label: 'Help', icon: faQuestion }
                ].map(x => (
                    <ListGroup.Item action>
                        <FontAwesomeIcon icon={x.icon} />
                        <span> {x.label}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )

};