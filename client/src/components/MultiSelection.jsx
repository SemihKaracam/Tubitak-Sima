import React from 'react'

const MultiSelection = ({ selections=[], setSelections }) => {
    const removeItem=(selection)=>{
        setSelections(selections.filter((s)=>(
            selection != s
        )))
    }
    return (
        <div className='flex my-2'>
            {
                selections?.map((selection) => (
                    <div className='bg-[#E4FCFA] py-1 px-2 border-green border-[2px] flex items-center gap-2'>
                        <span>{selection}</span>
                        <button onClick={()=>removeItem(selection)} type='button'>x</button>
                    </div>
                ))
            }
        </div>
    )
}

export default MultiSelection