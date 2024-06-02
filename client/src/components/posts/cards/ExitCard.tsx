"use client"

import { logOut } from "@/actions/logout"

function ExitCard():JSX.Element {
  return (
    <div className="right-2 absolute top-3"
     onClick={() => logOut()}>
        Exit
    </div>
  )
}

export default ExitCard