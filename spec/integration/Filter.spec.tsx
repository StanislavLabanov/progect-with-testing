import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { Filter } from "src/components/Filter";
import { List } from "src/components/List";

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Список задач', () => {
    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it('с включенным фильтром', async () => {
        let items: Task[] = [
            { id: "1", header: "купить хлеб", done: false },
            { id: "2", header: "купить молоко", done: true }
        ]

        const onChange = jest.fn(() => items = items.filter(el => !el.done));
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Filter setActive={onChange} />);
        const { rerender } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

        const checkbox = screen.getByTestId('checkbox_filter');
        const tasks = screen.getByTestId('tasks')

        expect(tasks.children.length).toBeLessThanOrEqual(2);
        await userEvent.click(checkbox);
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(checkbox).toBeChecked()
        rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
        expect(tasks.children.length).toBeLessThanOrEqual(1);
    })

    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it('с выключенным фильтром', async () => {
        let items: Task[] = [
            { id: "1", header: "купить хлеб", done: false },
            { id: "2", header: "купить молоко", done: true }
        ]

        const onChange = jest.fn(() => items = items.filter(el => !el.done));
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Filter setActive={onChange} />);
        render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

        const checkbox = screen.getByTestId('checkbox_filter');
        const tasks = screen.getByTestId('tasks')

        await userEvent.dblClick(checkbox);
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(checkbox).not.toBeChecked()
        expect(tasks.children.length).toBeLessThanOrEqual(2);
    })
    it('отображение фильтрации', () => {
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        let items: Task[] = [
            { id: "1", header: "купить хлеб", done: false },
            { id: "2", header: "купить молоко", done: true }
        ]

        render(<Filter setActive={onChange} />);
        render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

        expect(screen.getByTestId('filter_block')).toBeInTheDocument()
    })
})