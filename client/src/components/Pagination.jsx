import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
    const posts = []
    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        posts.push(i)
    }
    return (
        <div className='mt-4 flex gap-2'>
            {
                posts.map((post,index)=>(
                    <div key={index} className={`${currentPage == post && "bg-green-500"} w-[32px] h-[32px] border-[1px] border-[black] cursor-pointer flex items-center justify-center`} onClick={()=>setCurrentPage(post)}>
                        {post}
                    </div>
                ))
            }
        </div>
    )
}

export default Pagination