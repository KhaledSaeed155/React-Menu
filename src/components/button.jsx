const Button = ({content ,className ,...prop}) => {
    return (
        <button onClick={prop.onClick} className={className} >{content}</button>
    );
};

export default Button;