import Part from "./Part";
import { ContentProps } from "../types";

function Content({ courseParts }: ContentProps) {
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
}
export default Content;
