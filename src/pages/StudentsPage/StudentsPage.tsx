import React, { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  Divider,
  Form,
  Header,
  Icon,
  List,
  Loader,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getStudents } from "../../store/actions/student";

import "../../assets/styles/students.scss";
import { useSelector } from 'react-redux';

const StudentsPage: React.FC = () => {
  const [values, setValues] = useState<StudentsPageProps>({
    students: [],
    results: [],
    value: "",
  });

  const user = useSelector(({user: { user }}: any) => user);

  const { data, isLoading }: any = useStudents();

  useEffect(() => {
    setValues({ ...values, students: data?.students, results: data?.students });
  }, [data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!e.target.value) setValues({ ...values, results: values.students });
    const results = filterStudents(e.target.value);
    // @ts-ignore
    setValues({ ...values, value, results });
  };

  const filterStudents = (value: string) => {
    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = (result: { name: string }) => re.test(result.name);
    return _.filter(values.students, isMatch);
  };

  return (
    <Container>
      <Loader active={isLoading} />
      {values && (
        <Form>
          <Header as="h1" textAlign="center">
            Search student here
          </Header>
          <Form.Field>
            <Form.Input
              icon={<Icon name={"search"} />}
              type={"text"}
              id="search"
              name="search"
              aria-label="search"
              value={values.value}
              onChange={handleSearchChange}
            />
          </Form.Field>
        </Form>
      )}
      <Divider />
      <List selection verticalAlign="middle">
        {values.results &&
          values.results.map(
            (student: { id: string; name: string; email: string, createdAt: string }) => (
              <Link key={student.id} to={`/student/${student.id}/${student.name}/`}>
                <List.Item className={"student-item"}>
                  <List.Content>
                    <List.Header>{student.name}</List.Header>
                  </List.Content>
                  <List.Content>
                    <List.Header>{student.email}</List.Header>
                  </List.Content>
                </List.Item>
              </Link>
            )
          )}
      </List>
    </Container>
  );
};

const useStudents = () => {
  return useQuery<any>("students", getStudents);
};

export default StudentsPage;
