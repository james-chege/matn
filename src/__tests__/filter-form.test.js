import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FilterCourseForm from "../components/FilterCourseForm/FilterCourseForm";
import WithProvider from "../helpers/WithProvider";

describe("searh course", () => {
  test("search form", async () => {
    const onCourseSelect = jest.fn();
    render(
      WithProvider(<FilterCourseForm onCourseSelect={onCourseSelect} />, {})
    );
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, {
      target: { value: "Foo Bar" },
    });
    expect(searchInput.value).toBe("Foo Bar");
  });
});
