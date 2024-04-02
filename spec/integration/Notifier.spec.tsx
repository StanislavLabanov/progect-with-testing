import { render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";
import ue from "@testing-library/user-event";
import { Item } from "src/components/Item";
import { List } from "src/components/List";

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Оповещение при вополнении задачи', () => {
    it('при выполнении задачи должно появляться оповещение', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();
        const onClose = jest.fn();

        const { getByTestId } = render(<Item id={"1"} header={"купить хлеб"} done={false} onToggle={onToggle} onDelete={onDelete} />)
        const { rerender } = render(<Notifier open={false} task={'Задача "купить хлеб" завершена'} onClose={onClose} />);

        const checkbox = getByTestId('checkbox_item')
        expect(checkbox).not.toBeChecked()
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked()
        rerender(<Notifier open={true} task={'Задача "купить хлеб" завершена'} onClose={onClose} />)
        expect(screen.getByText(/Задача "купить хлеб" завершена/i)).toBeInTheDocument()
    })

    it('одновременно может отображаться только одно', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();
        const onClose = jest.fn();

        let items: Task[] = [
            { id: "1", header: "купить хлеб", done: false },
            { id: "2", header: "купить молоко", done: false }
        ]

        const { getAllByTestId } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
        const { rerender } = render(<Notifier open={false} task={'Задача "купить хлеб" завершена'} onClose={onClose} />);

        const checkboxes = getAllByTestId('checkbox_item')
        await userEvent.click(checkboxes[0])
        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
        rerender(<Notifier open={true} task={'Задача "купить хлеб" завершена'} onClose={onClose} />)
        expect(screen.getByText(/Задача "купить хлеб" завершена/i)).toBeInTheDocument()
        expect(screen.getAllByText(/Задача "купить хлеб" завершена/i).length).toBe(1)
    })
});