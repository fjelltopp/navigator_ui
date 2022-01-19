import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    validMockedUser, validMockedDatasets
} from '../../../jest/mocks';

const mockedApiResponses = {
    '/user': validMockedUser,
    '/datasets': validMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));

function Component() {
    return <h1>My Component</h1>
}

test('When the user and datasets are fetched, the main page content should be shown', async () => {
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('My Component')).toBeInTheDocument();
})
