import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RaceContext } from "~/context/RaceProvider";

const CATEGORY = ["races", "drivers", "teams"];
const Category = () => {
  const navigate = useNavigate();
  const { season, category } = useParams();

  const { selectedCatgory, setSelectedCategory } = useContext(RaceContext);

  const handleCategoryClick = (e: any) => {
    const category = (e.target as HTMLElement).dataset.category;
    const categoryText = e.target.innerHTML;
    category && setSelectedCategory(category);
    categoryText &&
      navigate(`/result/${season}/${category?.split(" ").join("-")}/all`);
  };

  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  return (
    <div className="wrapper__filter">
      <p className="wrapper__filter-heading">Category</p>
      <ul className="category">
        {CATEGORY.map((item) => {
          let active = item === selectedCatgory && "active";
          return (
            <li
              key={item.toLowerCase()}
              className={`cursor-pointer ${active}`}
              data-category={item.toLowerCase()}
              onClick={handleCategoryClick}
            >
              {item.toUpperCase()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
