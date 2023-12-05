import * as client from "./client";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
function Account() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    const save = async () => {
        await client.updateUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/signin");
    };


    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }

    }, []);
    return (
        <div className="w-50">
            <h1>Account</h1>
            {account && (
                <div>
                    <label for = "pas"> Password: </label>
                    <input id = "pas" value={account.password}
                           onChange={(e) => setAccount({ ...account,
                                                           password: e.target.value })}/>
                    <br/>
                    <label htmlFor="fN"> First Name: </label>
                    <input id = "fN" value={account.firstName}
                           onChange={(e) => setAccount({ ...account,
                                                           firstName: e.target.value })}/>
                    <br/>
                    <label htmlFor="lN"> Last Name: </label>
                    <input id = "lN" value={account.lastName}
                           onChange={(e) => setAccount({ ...account,
                                                           lastName: e.target.value })}/>
                    <br/>
                    <label htmlFor="dob"> DoB: </label>
                    <input id = "dob" value={account.dob}
                           onChange={(e) => setAccount({ ...account,
                                                           dob: e.target.value })}/>
                    <br/>
                    <label htmlFor="em"> Email: </label>
                    <input id = "em" value={account.email}
                           onChange={(e) => setAccount({ ...account,
                                                           email: e.target.value })}/>
                    <br/>
                    <label htmlFor="r"> Role: </label>
                    <select id="r" onChange={(e) => setAccount({ ...account,
                                                            role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <br/>
                    <button onClick={save}>
                        Save
                    </button>
                    <button onClick={signout}>
                        Signout
                    </button>
                    <Link to="/Kanbas/users" className="btn btn-warning w-100">
                        Users
                    </Link>

                </div>

            )}
        </div>
    );
}
export default Account;

