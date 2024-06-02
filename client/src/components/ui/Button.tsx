import React from 'react'

interface IProps {
  children:string,
  bg:string,
  click?:(...args:any[]) => any,
  type:"button"|"submit"
}

function Button({children,bg,click,type}:IProps):JSX.Element {
  return (
   <button onClick={click} type={type}
    className={`btn text-white rounded-xl text-xl p-[5px_15px_5px_15px]`}
    style={{backgroundColor:bg}}>
      {children}
   </button>
  )
}

export default Button