interface IMenu {
    children: string
}
const Menu = ({ children }: IMenu) => (
    <div className="menu">{children}</div>
);

export default Menu;