import React from 'react';
import "./Menu.css"

// Определяем интерфейс пропсов
interface MenuProps {
        children: React.ReactNode
}
const Menu = ({ children }: MenuProps): React.JSX.Element => (
    <div className="menu">{children}</div>
);

export default Menu;