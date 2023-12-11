import React, { useEffect, useState } from 'react'
import MultiSelection from './MultiSelection'
import axios from 'axios'

const Form = ({ handleChange, handleAction, formInputs, title, type, entityInfo = null }) => {
    const [selections, setSelections] = useState([])
    const [options,setOptions] = useState([])
    const formTitle = type == "create" ? `Add New ${title}` : `Edit ${title}`
    const formDescription = type == "create" ? `Form to add new ${title.toLowerCase()} to system` : `Form to edit ${title.toLowerCase()} in system`
    const handleSelect = (e) => {
        const selectedItem = e.target.value
        console.log(selectedItem)
        if (!selections.includes(selectedItem.toLowerCase())) {
            setSelections([...selections, selectedItem.toLowerCase()])
        }
    }
    console.log(title)
    const getDepartments = async ()=>{
        console.log(entityInfo?.bolum)
        const res = await axios.get("http://localhost:5000/lessons/findlesson?bolum="+entityInfo.bolum)
        console.log(res.data)
        setOptions(res.data)
    }
    useEffect(()=>{
        if(title == "Teacher"){
            getDepartments()
        }
    },[])
   
    return (
        <div>
            <form className='student-form w-[400px] p-4 border-[1px] text-[500] text-[#918E98]'>
                <div className='pb-4 text-black'>
                    <h4 className='text-[20px]'>{formTitle}</h4>
                    <p className='text-[14px]'>{formDescription}</p>
                </div>
                {
                    formInputs?.map((el, index) => (
                        <div key={index}>
                            {el.name != "_id" && <label>{el.label}</label>}
                            {el.name != "_id" && <input value={entityInfo?.[el.name]} onChange={handleChange} name={el.name} type="text" required readOnly={el.name == "userId" || el.name=="_id"} />}
                        </div>
                    ))
                }
                {
                    title == "Teacher" &&
                    <div>
                        <span className='block'>Verdiği Dersler</span>
                        <MultiSelection selections={selections} setSelections={setSelections} />
                        <select onChange={handleSelect} className='w-full py-2'>
                            {
                                options?.map((o)=>(
                                    <option>{o.dersAdi}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                <div className='flex justify-end mt-8'>
                    <button type='submit' onClick={handleAction} className='inline-block bg-greenBg text-white font-[400] rounded-sm px-2 py-1'>
                        {type == "create" ? "Add" : "Update"} {title}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form