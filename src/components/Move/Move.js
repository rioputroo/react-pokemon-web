import './Move.css';

function Move(props) {
    return <span className="MoveItem">
        {props.name.replace('-', ' ')}
    </span>
}

export default Move;