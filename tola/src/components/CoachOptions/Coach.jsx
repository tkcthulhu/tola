import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

import { useGlobalState } from "../../context/GlobalState";

function Coach(props)
{
    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="row">
                <Button onClick={() => navigate("/user/newprogram")}>
                    Create New Program
                </Button>
                <Button onClick={() => navigate("/user/editprograms")}>
                    Edit Programs
                </Button>
            </div>
        </div>
    )
}

export default Coach