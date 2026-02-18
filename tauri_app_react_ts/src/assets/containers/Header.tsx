import React from 'react';
import "./Header.css"

// Определяем интерфейс пропсов
interface HeaderProps {
		children: React.ReactNode
}

const Header = ({ children }: HeaderProps): React.JSX.Element => (
    <div className="header-wrapper">
        <div className="header-tools"></div>
        <div className="header">
            {children}
        </div>
    </div>
)

export default Header;