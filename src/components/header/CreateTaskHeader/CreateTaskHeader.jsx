import { Link } from "react-router-dom";
import React from "react";
import "./CreateTaskHeader.scss"

const CreateTaskHeader = () => {
    return (
        <div data-testid='create-task-button-header' className="create-task-button__title" title="Создать задачу">
            <Link className="text__title-create-task" to="/create-task">+</Link>
        </div>
    );
};

export default CreateTaskHeader;