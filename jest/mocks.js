export const unauthorizedMockedUser = {
    loading: null,
    data: null,
    error: { message: '401 Unauthorized' }
}

export const unauthorizedMockedDatasets = {
    loading: null,
    data: null,
    error: { message: '401 Unauthorized' }
}

export const erroredMockedUser = {
    loading: null,
    data: null,
    error: { message: 'Internal Server Error' }
}

export const erroredMockedDatasets = {
    loading: null,
    data: null,
    error: { message: 'Internal Server Error' }
}

export const loadingMockedUser = {
    loading: 1,
    data: null,
    error: null
}

export const loadingMockedDatasets = {
    loading: 1,
    data: null,
    error: null
}

export const validMockedUser = {
    loading: null,
    data: {
        "email": "test@test.org",
        "fullname": "Mr Test Man"
    },
    error: null
}

export const validMockedDatasets = {
    loading: null,
    data: {
        "datasets": [
            {
                "id": "test-test-test-test-test",
                "name": "Test HIV Estimates 2022",
                "organizationName": "Test Org"
            }
        ]
    },
    error: null
}

export const validButNoDatasetsMockedDatasets = {
    loading: null,
    data: {
        "datasets": []
    },
    error: null
}
