import React from "react";

global.React = React;

// global.window = {
//     location: { href: null }
// };

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => null
}))

jest.mock('react-cookie', () => ({
    useCookies: () => [
        { currentDatasetId: 'test-dataset-id' },
        () => null
    ]
}))
