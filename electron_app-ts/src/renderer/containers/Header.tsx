interface IHeader {
    children: JSX.Element[]
}

const Header = ({ children }: IHeader) => (
    <div className="header-wrapper">
        <div className="header-tools"></div>
        <div className="header">
            {children}
        </div>
    </div>
);

export default Header;