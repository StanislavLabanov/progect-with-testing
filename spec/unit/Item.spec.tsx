import { render, screen } from "@testing-library/react";
import { Item } from "src/components/Item";
import ue from "@testing-library/user-event";

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Элемент списка задач', () => {
    it('название не должно быть больше 32 символов', () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item id={"1"} header={"купить молоко"} done={false} onToggle={onToggle} onDelete={onDelete} />)
        const label = screen.getByTestId('label_item')

        expect(label.innerHTML.length < 32).toBe(true)
    });
    it('название не должно быть пустым', () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item id={"2"} header={"купить хлеб"} done={false} onToggle={onToggle} onDelete={onDelete} />)
        const label = screen.getByTestId('label_item')

        expect(label.innerHTML).not.toBe('')
    });
    it('нельзя удалять невыполненные задачи', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item id={"3"} header={"купить сникерс"} done={true} onToggle={onToggle} onDelete={onDelete} />)
        const checkbox = screen.getByTestId('checkbox_item')
        const deleteButton = screen.getByTestId('delete_button')

        expect(checkbox).toBeChecked()
        await userEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalledTimes(1)
    })
    it('текст должен стать перечеркнутым после выполнения задачи', () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { getByTestId } = render(<Item id={"1"} header={"купить хлеб"} done={true} onToggle={onToggle} onDelete={onDelete} />)
        const checked = getByTestId('checkbox_item')
        const label = screen.getByTestId('label_item')

        expect(checked).toBeChecked()
        expect(label.innerHTML).toMatch(/<s>/i)
    })
    it('отображение задачи', () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { asFragment } = render(<Item id={"1"} header={"купить хлеб"} done={true} onToggle={onToggle} onDelete={onDelete} />)
        const firstRender = asFragment();

        expect(firstRender).toMatchSnapshot();
    })
});