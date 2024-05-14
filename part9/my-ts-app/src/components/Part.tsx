import { PartProps } from "../types";

  const Part = ({ part }: PartProps ) => {
    switch (part.kind){
      case "basic":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p><i>{part.description}</i></p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>project exercise {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p><i>{part.description}</i></p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        );

    }
  }
export default Part;
