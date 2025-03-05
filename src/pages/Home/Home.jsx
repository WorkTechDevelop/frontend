import React from 'react';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            <div className="project-name__title">
                <p>WorkTask</p>
                <div className="add-project__icon-container">
                    <button className='add-project__icon'></button>
                </div>
            </div>
            <div className="task-conrainer">
                <div className="task-columns">
                    <div className="task-column to-do">
                        <div className="task-column__header">
                            <h3>To Do</h3>
                        </div>
                        <div className="task-column__divider "></div>
                    </div>
                    <div className="task-column in-progress">
                        <div className="task-column__header">
                            <h3>In Progress</h3>
                        </div>
                        <div className="task-column__divider "></div>
                    </div>
                    <div className="task-column review">
                        <div className="task-column__header">
                            <h3>Review</h3>
                        </div>
                        <div className="task-column__divider "></div>
                    </div>
                    <div className="task-column done">
                        <div className="task-column__header">
                            <h3>Done</h3>
                        </div>
                        <div className="task-column__divider"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;