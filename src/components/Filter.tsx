import { Dispatch, SetStateAction } from "react";

export interface Props {
   setActive: Dispatch<SetStateAction<boolean>>;
}

export const Filter = ({ setActive }: Props) => {
   return (
      <div className="filter-wrapper" data-testid="filter_block">
         Фильтровать
         <input data-testid="checkbox_filter" type="checkbox" onChange={() => setActive(prev => !prev)} />
      </div>
   );
};
