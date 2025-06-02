import React, { useState } from 'react';
import './Home.scss';

const Home = () => {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedCardId, setSelectedCardId] = useState(null);

    // Mockup data for the board
    const columns = [
        { id: 'work-task', title: 'WORK-TASK', cards: [] },
        { 
            id: 'todo', 
            title: 'TO DO', 
            cards: [
                { id: 'card1', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 },
                { id: 'card2', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 },
                { id: 'card5', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 },
            ] 
        },
        { 
            id: 'in-progress', 
            title: 'IN PROGRESS', 
            cards: [
                { id: 'card3', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 },
                { id: 'card6', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 },
            ] 
        },
        { 
            id: 'review', 
            title: 'REVIEW', 
            cards: [
                { id: 'card4', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 }
            ] 
        },
        { 
            id: 'done', 
            title: 'DONE', 
            cards: [
                { id: 'card7', taskId: 'SVD-1588', title: 'Создание меня для приоритетов', user: 'Михаил Прибытков', count: 2 }
            ] 
        }
    ];

    // Users with card counts
    const users = [
        { name: 'Михаил Прибытков', count: 6, active: true },
        { name: 'Иванов Иван', count: 1, active: false }
    ];

    const handleContextMenu = (e, cardId) => {
        e.preventDefault();
        setSelectedCardId(cardId);
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);
    };

    const handleCloseContextMenu = () => {
        setContextMenuVisible(false);
    };

    // Helper function to determine task color based on ID
    const getTaskColorClass = (taskId) => {
        if (taskId.includes('SVD-1588')) {
            const colorMap = {
                'card1': 'yellow',
                'card2': 'green',
                'card3': 'green',
                'card4': 'red',
                'card5': 'green',
                'card6': 'green',
                'card7': 'green'
            };
            return colorMap[selectedCardId] || 'green';
        }
        return 'green'; // Default
    };

    return (
        <div className="home-container" onClick={handleCloseContextMenu}>
            <div className="sidebar">
                <div className="filters-section">
                    <h3>ФИЛЬТРЫ</h3>
                    
                    <div className="filter-group">
                        <div className="filter-toggle">
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                            <span>Фильтрация по ФИО</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Проект:</h4>
                        <div className="checkbox-group">
                            <label className="checkbox-container">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmark"></span>
                                <span>CWork-Task</span>
                                <button className="more-btn">⋯</button>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmark"></span>
                                <span>QA-HELPER</span>
                                <button className="more-btn">⋯</button>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span>Work-Tech</span>
                                <button className="more-btn">⋯</button>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span>Сбербанк</span>
                                <button className="more-btn">⋯</button>
                            </label>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Исполнитель:</h4>
                        <div className="checkbox-group">
                            <label className="checkbox-container">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmark"></span>
                                <span>Михаил П.</span>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmark"></span>
                                <span>Иван И.</span>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span>Петр П.</span>
                            </label>
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span>Андрей С.</span>
                            </label>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Приоритет:</h4>
                        <div className="priority-buttons">
                            <button className="priority-btn low">LOW</button>
                            <button className="priority-btn medium">MEDIUM</button>
                            <button className="priority-btn high">HIGH</button>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Тип задачи:</h4>
                        <div className="task-type-buttons">
                            <button className="task-type-btn active">TASK</button>
                            <button className="task-type-btn">BUG</button>
                            <button className="task-type-btn">STORY</button>
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="apply-btn">Применить</button>
                        <button className="clear-btn">Очистить</button>
                    </div>

                    <div className="priority-legend">
                        <div className="legend-item">
                            <span className="color-box green"></span>
                            <span>- LOW</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box yellow"></span>
                            <span>- MEDIUM</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box red"></span>
                            <span>- HIGH</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="kanban-board">
                    {columns.map(column => (
                        <div key={column.id} className="kanban-column">
                            <h2 className="column-title">{column.title}</h2>
                            <div className="cards-container">
                                {column.cards.map(card => (
                                    <div 
                                        key={card.id} 
                                        className="task-card"
                                        onContextMenu={(e) => handleContextMenu(e, card.id)}
                                    >
                                        <div className="card-header">
                                            <span className={`task-id ${card.id === 'card4' ? 'red' : card.id === 'card1' ? 'yellow' : 'green'}`}>
                                                {card.taskId}
                                            </span>
                                            <button className="more-options">⋯</button>
                                        </div>
                                        <h3 className="card-title">{card.title}</h3>
                                        <div className="card-footer">
                                            <span className="assignee">{card.user}</span>
                                            <span className="count">{card.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User filters section */}
                <div className="user-filters">
                    {users.map((user, index) => (
                        <div key={index} className={`user-filter ${user.active ? 'active' : ''}`}>
                            <span className="user-name">{user.name}</span>
                            <span className="user-count">{user.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Context menu */}
            {contextMenuVisible && (
                <div 
                    className="context-menu"
                    style={{ 
                        top: contextMenuPosition.top, 
                        left: contextMenuPosition.left 
                    }}
                >
                    <ul>
                        <li>Копировать</li>
                        <li>Назначить</li>
                        <li>Изменить спринт</li>
                        <li>Удалить</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;