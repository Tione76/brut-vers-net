import { BANK_NEED_BLOCKS } from "./data";
import "./bank-cards.css";

export function BankNeedBlocks() {
  return (
    <ul className="bp-needs">
      {BANK_NEED_BLOCKS.map((item) => (
        <li key={item.id} className="bp-need">
          <p className="bp-need__title">{item.need}</p>
          <p className="bp-need__answer">{item.answer}</p>
        </li>
      ))}
    </ul>
  );
}
