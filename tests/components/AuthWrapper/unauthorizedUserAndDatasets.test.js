import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    unauthorizedMockedUser, unauthorizedMockedDatasets
} from '../../../jest/mocks';
import wrapper from '../../i18nProvider';

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
    delete window.location;
    window.location = { href: '' };
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />, { wrapper });
    })
    expect(window.location.href).toBe('/login');
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
