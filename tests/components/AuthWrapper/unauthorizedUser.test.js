import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../components/AuthWrapper';
import {
    unauthorizedMockedUser, validMockedDatasets
} from '../../jest/mocks';

const mockedApiResponses = {
    '/user': unauthorizedMockedUser,
    '/datasets': validMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));


function Component() {
    return <h1>My Component</h1>
}

test('When fetching the user returns a 401 Unauthorized, redirect to the login page', async () => {
    window.open = jest.fn()
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(window.open).toEqual('/login')
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
