import React, { ReactNode } from "react";

const Image = ({ children }: { children: ReactNode }) => {
  return { children };
};

Image.Season = ({
  children,
  src,
  alt,
  onClick,
}: {
  children: ReactNode;
  src: string;
  alt: string;
  onClick?: () => void;
}) => {
  return (
    <div className="rounded-lg h-[350px] shadow-lg cursor-pointer relative">
      <figure className="" onClick={onClick}>
        <div className="overflow-hidden absolute inset-0">
          <img
            className="hover:scale-125 transition-all"
            src={src}
            alt={alt}
            style={{
              borderRadius: "6px",
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <figcaption className="text-lg mt-5 text-black rounded-sm bg-[rgba(255,_255,_255,_0.5)] shadow-[inset_0px_2px_8px_rgba(255,_255,_255,0.1)] absolute right-0 bottom-0 p-2">
          Season {children}
        </figcaption>
      </figure>
    </div>
  );
};

export default Image;
