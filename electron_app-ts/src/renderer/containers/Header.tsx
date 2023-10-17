interface IHeaderDto {
    children: JSX.Element[]
}

const Header = ({ children }: IHeaderDto) => (
    <div className="header-wrapper">
        <div className="header-tools"></div>
        <div className="header">
            {children}
        </div>
    </div>
);

export default Header;