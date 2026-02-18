import React from 'react'
import "./Container.css"

// Определяем интерфейс пропсов
interface ContainerProps {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps): React.JSX.Element => (
    <div className="top-container">
        {children}
    </div>
)

export default Container