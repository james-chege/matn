import React from "react"
import { Button, Header, Grid } from 'semantic-ui-react';
import {Link, useHistory} from "react-router-dom";
import authUser from "../../utils/authUser.util";
import '../../assets/styles/homepage.scss'

const HomePage: React.FC  = () => {
    const history = useHistory()
    const loggedInUser = authUser();
    if (loggedInUser) {
        history.push('/students')
    }
    return (
        <Grid className={'main-container'} textAlign='center' verticalAlign='middle'>
            <Grid.Column>
                <Header
                    className={'main-header'}
                    as='h1'
                    content='Register Courses'
                    inverted
                />
                <h1 className='header home-warm-greetings'>Welcome, hope you've had a great time!</h1>
                <div className={'login-actions'}>
                    <Link to={'login'}>
                        <Button primary className='button'>Login</Button>
                    </Link>
                </div>
            </Grid.Column>
        </Grid>
    )
}
export default HomePage;
