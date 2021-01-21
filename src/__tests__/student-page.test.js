import React from "react";
import {
  act as acting,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useParams } from "react-router-dom";
import StudentPage from "../pages/StudentPage/StudentPage";
import studentCourses from "../__mocks__/student-courses";
import courses from "../__mocks__/courses";
import mockApi from "../utils/mockApi";
import WithProvider from "../helpers/WithProvider";

const StudentPageComponent = () => WithProvider(<StudentPage />, {});
describe("student page", () => {
  beforeEach(() => useParams.mockReturnValue({ id: 1, name: "edkakk" }));
  test("", async () => {
    const currentStudentCourses = mockApi(
      "get",
      "/api/student/courses/1",
      { courses: studentCourses },
      200
    );

    const expectedCourses = mockApi(
      "get",
      "/api/course/getCourses",
      { courses },
      200
    );

    const assignCourses = mockApi(
      "post",
      "/api/student/addCourse",
      {
        courses: courses[0],
        message: "Course(s) added successfully.",
      },
      200
    );

    render(<StudentPageComponent />);

    const user = useParams().name;

    expect(
      screen.getByText("Assign Courses to " + user)
    ).toBeInTheDocument();
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    fireEvent.click(screen.getByRole("combobox"));
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, {
      target: { value: "Chemistry" },
    });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("option")[0]);
    expect(screen.queryByText(user + " has the following courses")).toBeInTheDocument();
    // assign courses
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("register-form")).toHaveClass("ui container");
  });
});
