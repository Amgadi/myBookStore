import React from 'react'
import { Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const BottomBar = () => {
    return (
        <div align='center' className='navBar-bottom'>
            <Link to='/books'>
            <Button icon labelPosition='left' color='black' animated='vertical'>
                    <Icon name='book' />
                    Books
            </Button>
            </Link>
            <Link to='/categories'>
            <Button icon labelPosition='right' color='black' animated='vertical'>
                    <Icon name='list' />
                    Categories
            </Button>
            </Link>
        </div>
    )
}

export default BottomBar;