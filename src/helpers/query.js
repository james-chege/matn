import { QueryCache, QueryClient } from 'react-query';

const queryClient = new QueryClient();
const queryCache = new QueryCache({
    onError: error => {
        console.log(error)
    },
})


export {queryClient, queryCache};
