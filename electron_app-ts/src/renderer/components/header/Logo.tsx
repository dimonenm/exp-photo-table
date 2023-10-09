interface ILogo {
    children: string
}
const Logo = ({ children }: ILogo) => (
    <div className="logo">{children}</div>
);

export default Logo;