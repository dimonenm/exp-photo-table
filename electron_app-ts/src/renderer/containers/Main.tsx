interface IMainDto {
    children: JSX.Element[]
}

const Main = ({ children }: IMainDto) => (
    <div className="main-wrapper">
        <div className="main">
            {children}
        </div>
    </div>
);

export default Main;