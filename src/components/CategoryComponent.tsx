import { Link } from "react-router-dom"

type propTypes = {
    imgURL: string,
    name: string,
    id: string
}

export default function CategoryComponent(props: propTypes) {

    const style: React.CSSProperties = {
        backgroundImage: `url(${props.imgURL})`,
        height: "200px",
        marginBottom: "10px",
        marginLeft: "10px"
    }

    return (
        <Link to={`/category/${props.id}`} style={{ textDecoration: "none", color: "white" }}>
            <div style={style}>
                <h4>{props.name}</h4>
            </div>
        </Link>
    )
}
