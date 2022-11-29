import update from '../img/update-button.png'

function Maxes(props) {
    let maxes = [...props.users.maxes]

    let max_view = []

    for (const max of maxes) {

        console.log(max.exercise)
        max_view.push(
            <li className="list-group-item">
                <div className="row">
                    <div className="col">
                        {max.exercise}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <br/><p className="tab">{max.reps} Rep Max: {max.weight}</p><p className="tab">{max.date}</p>
                    </div>
                    <div className="col-3">
                        <img src={update} alt="" className="ratio" />
                    </div>
                </div>
            </li>
        )
    }

    return (
        <ul className="list-group list-group-flush">
            {max_view}
        </ul>
    )
}

export default Maxes