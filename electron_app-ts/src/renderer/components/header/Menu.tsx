interface IMenuDto {
    children: JSX.Element[]
}
const Menu = ({ children }: IMenuDto) => (
    <div className="menu">{children}</div>
);

export default Menu;