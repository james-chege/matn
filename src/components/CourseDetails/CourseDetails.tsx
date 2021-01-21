import React from "react";
import {
  Button,
  Container,
} from "semantic-ui-react";

const CourseDetails: React.FC<CourseDetailsProps> = ({ submit, course, isLoading }) => {
  const onSubmit = () => {
    submit?.(course);
  };

  return (
    <Container data-testid="register-form" onSubmit={onSubmit}>
      <div className={'assign-course-action'}>
            <Button disabled={isLoading} onClick={onSubmit} data-testid="course-add-btn" primary>
              {isLoading ? 'Loading...' : 'Assign'}
            </Button>
      </div>
    </Container>
  );
};

export default CourseDetails;
