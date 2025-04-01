import { useState, useRef, useEffect } from "react";
import "./CreateTaskHeader.scss";
import CreateTask from "../../../pages/CreateTask/CreateTask";

const CreateTaskHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div className="create-task-container">
            <button className="create-task-button" onClick={toggleModal} title="Создать задачу">
                +
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    {/* <div className="modal-content" ref={modalRef}> */}
                        <CreateTask onClose={toggleModal} />
                    </div>
                // </div>
            )}
        </div>
    );
};

export default CreateTaskHeader;