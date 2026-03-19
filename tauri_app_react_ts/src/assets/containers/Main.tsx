import React from 'react';
import "./Main.css"

// Определяем интерфейс пропсов
interface MainProps {
		children: React.ReactNode
}

const Main = ({ children }: MainProps): React.JSX.Element => (
    <div className="main-wrapper">
        <div className="main">
            {children}
        </div>
    </div>
)

export default Main;