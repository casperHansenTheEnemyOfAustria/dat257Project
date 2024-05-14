import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../taskList.test';

describe('TaskList', () => {
    test('renders task list component', () => {
        render(<TaskList tasks={[]} />);
        const taskListElement = screen.getByTestId('task-list');
        expect(taskListElement).toBeInTheDocument();
    });

    test('renders correct number of tasks', () => {
        const tasks = [
            { id: 1, title: 'Task 1', completed: false },
            { id: 2, title: 'Task 2', completed: true },
            { id: 3, title: 'Task 3', completed: false },
        ];
        render(<TaskList tasks={tasks} />);
        const taskElements = screen.getAllByTestId('task-item');
        expect(taskElements.length).toBe(tasks.length);
    });
    // Add more tests here based on your requirements

});