import React from 'react';
import "./Logo.css"

// Определяем интерфейс пропсов
interface LogoProps {
		children: React.ReactNode
}

const Logo = ({ children }: LogoProps): React.JSX.Element => (
    <div className="logo">{children}</div>
)

export default Logo;