import { render, act, screen } from '@testing-library/react';
import AuthWrapper from '../../../components/AuthWrapper';
import {
    validMockedUser, validButNoDatasetsMockedDatasets
} from '../../../jest/mocks';
import wrapper from '../../i18nProvider';

const mockedApiResponses = {
    '/user': validMockedUser,
    '/datasets': validButNoDatasetsMockedDatasets
}

jest.mock('axios-hooks', () => ({
    makeUseAxios: () => url =>
        [{ ...mockedApiResponses[url] }]
}));


function Component() {
    return <h1>My Component</h1>
}

test('When fetching the datasets no datasets, redirect to the no_datasets page', async () => {
    delete window.location;
    window.location = { href: '' };
    await act(async () => {
        render(<AuthWrapper {...{ Component }} />, { wrapper });
    })
    expect(window.location.href).toBe('/no_datasets');
    expect(screen.queryByText('My Component')).not.toBeInTheDocument();
})
