import React, {SyntheticEvent, useEffect, useState} from "react";
import {Dropdown, DropdownOnSearchChangeData, DropdownProps, Form} from "semantic-ui-react";
import { getCourses } from "../../store/actions/course";
import { useQuery } from "react-query";

const FilterCourseForm: React.FC<SearchCourseProps> = ({ onCourseSelect }) => {

    const [options, setOptions] = useState( []);

    const { data, isLoading } = useCourses();

    const onSearchChange = async (e: SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
    };

    const onChange = (e: SyntheticEvent<HTMLElement, Event>, content: DropdownProps) => {
        onCourseSelect(content.value);
    }

    useEffect(() => {
        const arr: any = [];
        data?.courses?.map((course: any) => {
         arr.push({key: course.id, value: course.id, text: course.name})
        })
        setOptions(arr);
    }, [data?.courses])

    return (
        <Form>
            <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                placeholder="Search course (eg. chemistry)"
                onSearchChange={onSearchChange}
                options={options}
                loading={isLoading}
                onChange={onChange}
            />
        </Form>
    )
}

const useCourses = () => {
    return useQuery("courses", getCourses)
}

export default FilterCourseForm;
