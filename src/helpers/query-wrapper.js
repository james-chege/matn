// https://react-hooks-testing-library.com/reference/api#wrapper

import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query';

const queryWrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

export default queryWrapper;
