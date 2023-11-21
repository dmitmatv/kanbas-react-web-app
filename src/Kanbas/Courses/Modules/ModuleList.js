import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setModules,
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./modulesReducer";
import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                      dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleUpdateModule = async () => {
        client.updateModule(module).then((module) => {
            dispatch(updateModule(module));
        });
        //const status = await client.updateModule(module);
        //dispatch(updateModule(module));
    };

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };





    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <button
                    onClick={handleAddModule}>
                    Add
                </button>
                <button
                    onClick={() => handleUpdateModule()}>
                    Update
                </button>
                <input
                    value={module.name}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    }/>
                <textarea
                    value={module.description}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, description: e.target.value }))
                    }/>
            </li>
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">
                        <button
                            onClick={() => handleUpdateModule()}>
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteModule(module._id)}>
                            Delete
                        </button>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                    </li>
                ))}
        </ul>
    );
}
export default ModuleList;

