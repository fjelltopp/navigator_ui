import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    loadingMockedUser, validMockedDatasets
} from '../../../jest/mocks';
import wrapper from '../../i18nProvider';

const mockedApiResponses = {
    '/user': loadingMockedUser,
    '/datasets': validMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));

function Component() {
    return <h1>My Component</h1>
}

test('When the user is being fetched, the main page content should be hidden and a loading message should be shown', async () => {
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />, { wrapper });
    })
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
