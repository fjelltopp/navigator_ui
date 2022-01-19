import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    validMockedUser, unauthorizedMockedDatasets
} from '../../../jest/mocks';

const mockedApiResponses = {
    '/user': validMockedUser,
    '/datasets': unauthorizedMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));


function Component() {
    return <h1>My Component</h1>
}

test('When fetching the datasets returns a 401 Unauthorized, redirect to the login page', async () => {
    delete window.location;
    window.location = { href: '' };
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(window.location.href).toBe('/login');
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
