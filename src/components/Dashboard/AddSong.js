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
      const [colorOne, setColorOne] = useState('#748FB4')
      const [colorTwo, setColorTwo] = useState('#cccccc')

    // Handler

      const colorOneOnChangeHandler = (e) => {
        setColorOne(e.target.value)
        setInputs({...inputs, color: [e.target.value]})
      }
      
      const colorTwoOnChangeHandler = (e) => {
        setColorTwo(e.target.value)
        setInputs({...inputs, color: [colorOne,e.target.value]})
      }
      
      
      const onChangeHandler = (e) => {
        const {name, value} = e.target
        setInputs({ ...inputs, [name]: value} )
      }
      

    // Adding song object

    const createSong = async () => {
        if(inputs !== initState && inputs.audio !== '' ){
          await fetch('http://localhost:3000/songs',{
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {'Content-Type': 'application/Json'}
          })
        }else{
          alert('name, audio is required')
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
              <div style={{width: '61%' , height: '1rem', backgroundImage: `linear-gradient(to right, ${colorOne} , ${colorTwo})`, borderRadius: '1rem', margin: '.8rem'}}></div>
               <div className='color-input-container'>
                <input onChange={colorOneOnChangeHandler} value={colorOne} type="color" />
                <input onChange={colorTwoOnChangeHandler} value={colorTwo} type="color" />
                </div>
              <button onClick={createSong}>Add</button>
        </div>
    )
}

export default AddSong
