import React from "react";

global.React = React;

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => null
}))

jest.mock('react-cookie', () => ({
    useCookies: () => [
        { currentDatasetId: 'test-dataset-id' },
        () => null
    ]
}))

jest.mock('next/dist/client/router', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}))
