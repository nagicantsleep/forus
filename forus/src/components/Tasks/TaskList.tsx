import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask } = useTasks();
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            addTask(newTask.trim());
            setNewTask('');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-black/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Tasks</h2>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                />
            </form>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.length === 0 ? (
                    <div className="text-center text-white/30 py-8">
                        No tasks yet. Stay focused!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
