import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const URL = `${API_BASE}/a5`

function EncodingParametersInURLs() {
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);
    const [welcome, setWelcome] = useState("");
    const [result, setResult] = useState(0);
    const fetchSum = async (a, b) => {
        const response = await
            axios.get(`${URL}/add/${a}/${b}`);
        setResult(response.data);
    };
    const fetchSubtraction = async (a, b) => {
        const response = await axios.get(
            `${URL}/subtract/${a}/${b}`);
        setResult(response.data);
    };

    const fetchWelcome = async () => {
        const response = await axios.get(`${URL}/welcome`);
        setWelcome(response.data);
    };
    useEffect(() => {
        fetchWelcome();
    }, []);

    return (
        <div>
            <h3>Encoding Parameters In URLs</h3>
            <h4>Integrating React with APIs</h4>
            <h5>Fetching Welcome</h5>
            <h6>{welcome}</h6>



            <h4>Calculator</h4>
            <input
                onChange={(e) => setA(e.target.value)}
                className="form-control" type="number" value={a}/>
            <input
                onChange={(e) => setB(e.target.value)}
                className="form-control" type="number" value={b}/>

            <input value={result}
                   className="form-control mb-2" type="number" readOnly
            />
            <h3>Fetch Result</h3>
            <button onClick={() => fetchSum(a, b)}
                    className="btn btn-primary mb-2  w-100" >
                Fetch Sum of {a} + {b}
            </button>
            <button onClick={() => fetchSubtraction(a, b)}
                    className="btn btn-danger me-2 w-100" >
                Fetch Substraction of {a} - {b}
            </button>


            <h3>Path Parameters</h3>
            <a
                href={`${URL}/add/${a}/${b}`}
                className="btn btn-primary">
                Add {a} + {b}
            </a>
            <a
                href={`${URL}/subtract/${a}/${b}`}
                className="btn btn-danger">
                Subtract {a} - {b}
            </a>
            <h3>Query Parameters</h3>
            <a
                href={`${URL}/calculator?operation=add&a=${a}&b=${b}`}
                className="btn btn-primary">
                Add {a} + {b}
            </a>
            <a
                href={`${URL}/calculator?operation=subtract&a=${a}&b=${b}`}
                className="btn btn-danger">
                Subtract {a} - {b}
            </a>

        </div>
    );
}
export default EncodingParametersInURLs;