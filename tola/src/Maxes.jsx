function Maxes(props) {
    let maxes = [...props.users.maxes]

    let max_view = []

    for (const max of maxes) {

        console.log(max.exercise)
        max_view.push(
            <li className="list-group-item">{max.exercise}<br/><p className="tab">{max.reps} Rep Max: {max.weight}</p></li>
        )
    }

    return (
        <ul className="list-group list-group-flush">
            {max_view}
        </ul>
    )
}

export default Maxes