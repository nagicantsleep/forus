import React from 'react';
import type { Task } from '../../context/TaskContext';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${task.completed ? 'bg-white/5' : 'bg-white/10 hover:bg-white/20'
                }`}
        >
            <button
                onClick={() => onToggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                    ? 'bg-green-400 border-green-400'
                    : 'border-white/50 hover:border-white'
                    }`}
            >
                {task.completed && (
                    <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </button>

            <span
                className={`flex-1 text-white transition-all ${task.completed ? 'line-through text-white/30' : 'text-white/90'
                    }`}
            >
                {task.text}
            </span>

            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-white/50 hover:text-red-400 transition-all"
                aria-label="Delete task"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>
    );
};
