import React from 'react'
import "./Workplace.css"

interface WorkplaceProps {
    children?: React.ReactNode
}

const Workplace = ({ children }: WorkplaceProps): React.JSX.Element => {
    return (
        <div className="workplace">
            {children}
        </div>
    )
}

export default Workplace