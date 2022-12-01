import { useNavigate } from "react-router-dom";

function Home(props) {
    
    let navigate = useNavigate();

    function WhereGo(status) {
        if (status) {
            navigate("/tola/dashbord")
        } else {
            navigate("/login")
        }
        
    }
    

    return(
        <div onLoad={WhereGo(props.status)}>
        </div>
    )
}

export default Home