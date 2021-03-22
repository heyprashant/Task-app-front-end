import React from 'react';
import CheckBox from './CheckBox';
import { FaPencilAlt, FaTrash, FaRegSave} from "react-icons/fa";


export default function TodoItem(props) {
    const {data, changeStatus, deleteItemById} = props;
    const handleChange = (checked) => changeStatus(data._id, checked);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');



    return (
        <li className={className}>
            <div className="checkbox" style={{display:'flex', justifyContent: 'space-between'}}>
                <label onClick={() => console.log('click')}>
                    <CheckBox checked={data.completed} onChange={handleChange}/> {data.description}
                </label>
                    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
                        {/* <div style={{paddingRight:'20px'}}><FaPencilAlt  cursor="pointer" color='#A4A4A4' size='1.5rem' /></div> */}
                        <div style={{paddingRight:'10px'}} onClick={() => {deleteItemById(data._id)}}><FaTrash cursor="pointer"  color='#A4A4A4' /></div>
                    </div>
            </div>
        </li>
    );
}
