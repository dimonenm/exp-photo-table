interface IMenu {
    children: JSX.Element[]
}
const Menu = ({ children }: IMenu) => (
    <div className="menu">{children}</div>
);

export default Menu;