import React from "react";
import { Icon, Message } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const SuccessMessage = ({ header, content}: {header: string; content: string}) => (
<Message success icon>
    <Icon name="checkmark" />
    <Message.Content>
        <Message.Header>
            {header}
        </Message.Header>
        <Link to="/students">{content}</Link>
    </Message.Content>
</Message>
);

export default SuccessMessage;
