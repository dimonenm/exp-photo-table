interface IContainerDto{
    children: JSX.Element
}

const Container = ({ children }: IContainerDto) => (
    <div className="top-container">
        {children}
    </div>
);

export default Container;