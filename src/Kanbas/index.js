import KanbasNavigation from "./KanbasNavigation";
import Signin from "./users/signin";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import db from "./Database";
import {useEffect, useState} from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./users/account";
import UserTable from "./users/table";
import Signup from "./users/signup";



const API_BASE = process.env.REACT_APP_API_BASE;
const URL = `${API_BASE}/api/courses`

function Kanbas() {
    const [courses, setCourses] = useState([]);
    //const URL = "http://localhost:4000/api/courses";
    const findAllCourses = async () => {
        const response = await axios.get(URL);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
                                             name: "New Course",      number: "New Number",
                                             startDate: "2023-09-10", endDate: "2023-12-15",
                                         });
    const addCourse = async () => {
        const response = await axios.post(URL, course);
        setCourses([
                       response.data,
                       ...courses,
                   ]);
        setCourse({ name: "" , number: "", startDate: "", endDate: ""});
    };

    const deleteCourse = async (course) => {
        const response = await axios.delete(
            `${URL}/${course._id}`
        );
        setCourses(courses.filter(
            (c) => c._id !== course._id));
    };

    const updateCourse = async (course) => {
        const response = await axios.put(
            `${URL}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    return(
        <Provider store={store}>
        <div className="d-flex">
            <KanbasNavigation/>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account" element={<h1>Account</h1>} />
                    <Route path="Dashboard" element={<Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}/>
                    } />
                    <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/admin/users" element={<UserTable />} />
                    <Route path="/account/:id" element={<Account />} />

                </Routes>
            </div>
        </div>
        </Provider>
    );

}
export default Kanbas