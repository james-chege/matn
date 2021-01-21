import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
  act as acting,
} from "@testing-library/react";
import React from "react";
import LoginPage, { useCustomMutation } from "../pages/LoginPage/LoginPage";
import { renderHook, act } from "@testing-library/react-hooks";
import mockApi from "../utils/mockApi";
import WithProvider from "../helpers/WithProvider";
import queryWrapper from "../helpers/query-wrapper";

const data = { name: "James", email: "j@g.com", password: "pass" };

describe("login flow", () => {
  beforeEach(() => {
    render(WithProvider(<LoginPage data={data} />, {}));
  });

  afterEach(cleanup);

  test("Should validate form", async () => {
    expect(screen.getAllByText("Login")).toHaveLength(2);
    fireEvent.click(screen.getByTestId("submit-btn"));
    await waitFor(() => screen.getByRole("heading"));
    screen.debug();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("Should submit form without errors", async () => {
    fireEvent.change(screen.getByPlaceholderText("example@example.com"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
      target: { value: "securePass1" },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
    await waitFor(() => screen.getByRole("heading"));
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("login-form")).toHaveClass("loading");
  });

  test("login mutation hook should work properly", async () => {
    const scope = mockApi(
      "post",
      "/api/user/login",
      { token: "thisisatoken" },
      200
    );

    const { result, waitFor } = renderHook(() => useCustomMutation(), {
      wrapper: queryWrapper,
    });
    expect(typeof result.current.mutate).toBe("function");
    act(() => {
      result.current.mutate({ email: "", password: "" });
    });
    await waitFor(() => result.current.data.token);
    expect(result.current.data).toEqual({ token: "thisisatoken" });
    expect(scope.isDone()).toBe(true);
  });

  test("should handle error", async () => {
    const scope = mockApi(
      "post",
      "/api/user/login",
      "wrong email and or password!",
      400
    );

    fireEvent.change(screen.getByPlaceholderText("example@example.com"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
      target: { value: "securePass1" },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    await waitFor(() => screen.getByRole("heading"));
    screen.debug();
    // expect(
    //   screen.getByText("Invalid credentials, could not log you in.")
    // ).toBeInTheDocument();
    expect(scope.isDone()).toBe(true);
  });

  test("should login successfully", async () => {
    const scope = mockApi(
      "post",
      "/api/user/login",
      { token: "thisisatoken", name: "fake", email: "fake@g.com" },
      200
    );
    fireEvent.change(screen.getByPlaceholderText("example@example.com"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
      target: { value: "securePass1" },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    await waitFor(() => screen.getByRole("heading"));
  });
});
