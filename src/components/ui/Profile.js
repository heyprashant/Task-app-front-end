import React, { useState, useEffect } from 'react'
import { FaPencilAlt, FaTrash, FaRegSave} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'

export default function Profile (props) {

    const AUTH_TOKEN = `Bearer ${props.token}`
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setMail] = useState("");
    const [imgData, setImg] = useState(null);
    // const [editImg, setEditImg] = useState(false)

    useEffect( async () => {
        const res = await axios.get('/users/me')
        console.log(res.data)
        setName(res.data.name)
        setAge(res.data.age)
        setMail(res.data.email)
        if(res.data.avatar) {
            setImg(`data:image/jpeg;base64,${res.data.avatar}`)
        }
    }, [])



    const profile = <img src={imgData} alt="Profile pic" width="150" height="150" />
    const noProfile = <img src={url} alt="Profile pic" width="150" height="150"/>

    const onSave = async () => {
        const data = {
            name,
            email,
            age
        }
        await axios.patch('/users/me', data)
        setEdit(false)
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

    const onDeleteAvatar = async () => {
        await axios.delete('/users/me/avatar')
        setImg(null)
    }

    const onFileInput = async (e) => {
        // console.log(e)
        let formData =  new FormData()
        formData.append('avatar', e.target.files[0])
        // const formData = {avatar: e.target.files[0]}
        await axios.post('/users/me/avatar',formData , {headers: {"Content-Type": "multipart/form-data"}})
        const dataUrl = await getBase64(e.target.files[0])
        console.log(dataUrl)
        setImg(dataUrl)
    }

    const disable = name.trim().length === 0 | email.trim().length === 0

    const update = (
        <p className="forgot-password text-right textClick">Update info <button onClick={() => setEdit(true)}><span style={{marginLeft:'10px'}}>
            <FaPencilAlt color="#333"  fontSize='1.5rem'/></span></button> </p>
    )
    const save = (
        <p className="forgot-password text-right textClick">Save info <button onClick={onSave} disabled={disable}><span style={{marginLeft:'10px'}}>
            <FaRegSave color="#333" fontSize='1.5rem'/></span></button> </p>
    )

    const nameInput = (<input value={name} onChange={(e)=>{setName(e.target.value)}} required></input>)
    const ageInput = (<input value={age} onChange={(e)=>{setAge(e.target.value)}} required></input>)
    const mailInput = (<input value={email} onChange={(e)=>{setMail(e.target.value)}} required></input>)



    const imageInput = (<div class="custom-file-upload"><label >
            <input type="file" onChange={onFileInput}/>
                <FaPencilAlt   color="#333" cursor="pointer"  fontSize='1.5rem'/>
        </label>
            <FaTrash onClick={onDeleteAvatar} cursor="pointer" color="#333" fontSize='1.5rem'/>
        </div>
        )



    return (
        <div className='inner' style={{padding:'50px 20px'}}>
            <div className='profile'>
                <div>
                    {imgData? profile: noProfile}
                    <div style={{marginTop:'10px'}}>
                        {edit ?
                            imageInput :
                            null}
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    <div ><label>Name:</label>  {edit? nameInput: name}  </div>
                    <div><label>Age:</label>   {edit? ageInput:age}  </div>
                    <div><label>Mail:</label>   {edit? mailInput:email} </div>
                </div>
            </div>
            <div className='edit'>
                {edit? save: update}
                <p className="forgot-password text-right textClick">Delete Account <button disabled={edit}><span style={{marginLeft:'10px'}}>
                    <FaTrash onClick={() => history.push('/delete')} color="#333" fontSize='1.5rem'/> </span> </button></p>
            </div>

        </div>
    )
}
