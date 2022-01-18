import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../components/AuthWrapper';
import {
    unauthorizedMockedUser, unauthorizedMockedDatasets
} from '../../jest/mocks';

const mockedApiResponses = {
    '/user': unauthorizedMockedUser,
    '/datasets': unauthorizedMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));


function Component() {
    return <h1>My Component</h1>
}

test('When fetching the user and datasets returns a 401 Unauthorized, redirect to the login page', async () => {
    window.open = jest.fn()
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(window.open).toEqual('/login')
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
