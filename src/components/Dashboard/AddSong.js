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
        if(inputs !== initState && inputs.audio !== '' ){
          await fetch('http://localhost:3000/songs',{
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {'Content-Type': 'application/Json'}
          })
        } 
        // setInputs(initState)
    }


    return (
        <div className='add-song'>
            <h2>Add song</h2>
              <input name='name' onChange={onChangeHandler} placeholder='name' type="text" />
              <input name='artist' onChange={onChangeHandler} placeholder='artist' type="text" />
              <textarea cols='50' rows='5' name='audio' onChange={onChangeHandler} placeholder='audio' type="text" />
              <textarea cols='50' rows='5' name='cover' onChange={onChangeHandler} placeholder='cover' type="text" />
               <div className='color-input-container'>
                <input type="text" placeholder='color-1' />
                <input type="text" placeholder='color-2' />
                </div>
              <button onClick={createSong}>Add</button>
        </div>
    )
}

export default AddSong
