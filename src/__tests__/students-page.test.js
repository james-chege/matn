import { act as acting, render, screen } from "@testing-library/react";
import StudentsPage from "../pages/StudentsPage/StudentsPage";
import React from "react";
import mockApi from "../utils/mockApi";
import { SERVER_ERROR } from "../utils/constants";
import { queryClient } from '../helpers/query';
import WithProvider from '../helpers/WithProvider';

test('should render properly', async () => {
    const scope = mockApi(
        'get',
        '/api/student',
        SERVER_ERROR,
        400
        )

    render(WithProvider(<StudentsPage/>, {}))
    await queryClient.cancelQueries();
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(screen.getByText('Search student here')).toBeInTheDocument();
})
