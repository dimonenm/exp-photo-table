interface ILogoDto {
    children: string
}
const Logo = ({ children }: ILogoDto) => (
    <div className="logo">{children}</div>
);

export default Logo;