import React,{useState} from 'react'

const AddSong = () => {
    const initState = {
        name: "",
        artist: "",
        audio: "",
        cover: "",
        active: false,
        color: ['','']
      }
      const [inputs, setInputs] = useState(initState)

    // Handler
      const onChangeHandler = (e) => {
        const {name, value} = e.target
        setInputs({ ...inputs, [name]: value} )
      }
      console.log(inputs)
      

    // Adding song object

    const createSong = async () => {
       
        await fetch('http://localhost:3000/songs',{
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {'Content-Type': 'application/Json'}
        })
        // setInputs(initState)
    }


    return (
        <div className='add-song'>
            <h2>Add song</h2>
              <input name='name' onChange={onChangeHandler} placeholder='name' type="text" />
              <input name='artist' onChange={onChangeHandler} placeholder='artist' type="text" />
              <input name='audio' onChange={onChangeHandler} placeholder='audio' type="text" />
              <input name='cover' onChange={onChangeHandler} placeholder='cover' type="text" />
              <button onClick={createSong}>Add</button>
        </div>
    )
}

export default AddSong
