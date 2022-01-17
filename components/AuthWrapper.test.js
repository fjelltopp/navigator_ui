/**
 * @jest-environment jsdom
 */

import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../components/AuthWrapper'
import { mockedApiResponses } from '../jest/mocks';

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => null
}))
jest.mock('react-cookie', () => ({
    useCookies: () => [
        { currentDatasetId: 'iuhk' },
        () => (1)
    ]
}))

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url => {
        return [{
            data: mockedApiResponses[url],
            loading: null,
            error: null,
        }]
    }
}));

describe("scenario", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('test stuff', async () => {

        function TestComponent() {
            return <h1>Hello World</h1>
        }
        await act(async () => {
            render(
                <AuthWrapper
                    Component={TestComponent}
                    pageProps={{ test: 1 }}
                />
            );
        })
        await screen.findByText('Hello World')
    })
})
