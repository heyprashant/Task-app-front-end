import React from 'react'
import {useHistory} from 'react-router-dom'

export default function deleteAccountModal() {
    const history = useHistory()
    const onDeleteAccount = () => {
        history.push('/')
    }
    return (
        <div className='inner '>
            <p ><strong>Are you sure? You'll permanently loose your data.</strong></p>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <button className="cancelBtn" onClick={() => history.push('/me')}>Cancel</button>
                <button className="deleteBtn" onClick={onDeleteAccount}>Delete</button>
            </div>

        </div>
    )
}
