import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    validMockedUser, loadingMockedDatasets
} from '../../../jest/mocks';

const mockedApiResponses = {
    '/user': validMockedUser,
    '/datasets': loadingMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));

function Component() {
    return <h1>My Component</h1>
}

test('When datasets are being fetched, the main page content should be hidden and a loading message should be shown', async () => {
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
