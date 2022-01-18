import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    erroredMockedUser, validMockedDatasets
} from '../../../jest/mocks';

const mockedApiResponses = {
    '/user': erroredMockedUser,
    '/datasets': validMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));


function Component() {
    return <h1>My Component</h1>
}

test('When fetching the user returns an Internal Server Error, display an error page', async () => {
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />);
    })
    expect(screen.getByTestId('ErrorMessage')).toBeInTheDocument();
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
