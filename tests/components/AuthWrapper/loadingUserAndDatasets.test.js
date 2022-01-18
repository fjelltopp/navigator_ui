import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../components/AuthWrapper';
import {
    loadingMockedUser, loadingMockedDatasets
} from '../../jest/mocks';

const mockedApiResponses = {
    '/user': loadingMockedUser,
    '/datasets': loadingMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));

function Component() {
    return <h1>My Component</h1>
}

test('When the user and datasets are being fetched, the main page content should be hidden and a loading message should be shown', async () => {
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
