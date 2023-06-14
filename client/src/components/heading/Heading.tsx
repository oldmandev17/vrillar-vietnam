import { useContext } from "react";
import { RaceContext } from "~/context/RaceProvider";

const Heading = () => {
  const { heading } = useContext(RaceContext);
  return (
    <div className="font-Teko">
      <div>
        {heading.name && (
          <div>
            <h1 className="text-6xl">{heading?.name}</h1>
            <div className="my-5 font-normal text-lg flex items-center gap-4">
              <span className="text-black">{heading.date}</span>
              <p className="text-black text-opacity-50">
                {heading.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Heading;
