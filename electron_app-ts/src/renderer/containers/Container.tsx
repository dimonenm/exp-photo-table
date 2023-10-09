interface IContainer{
    children: JSX.Element
}

const Container = ({ children }: IContainer) => (
    <div className="top-container">
        {children}
    </div>
);

export default Container;