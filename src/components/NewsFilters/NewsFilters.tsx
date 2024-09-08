import { getCategories } from "../../api/apiNews.ts";
import { useFetch } from "../../helpers/hooks/useFetch.js";
import Categories from "../Categories/Categories.tsx";
import Search from "../Search/Search.jsx";
import styles from "./styles.module.css";
import Slider from "../Slider/Slider.jsx";
import { IFilters, CategoriesApiResponse } from "../../interfaces/index.ts";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  filters: IFilters;
  changeFilter: (key: string, value: string | number | null) => void;
}

const NewsFilters = ({ filters, changeFilter }: Props) => {
  const { isDark } = useTheme();
  const { data: dataCategories } = useFetch<CategoriesApiResponse, null>(
    getCategories
  );
  return (
    <div className={styles.filters}>
      {dataCategories ? (
        <Slider isDark={isDark}>
          <Categories
            categories={dataCategories.categories}
            selectedCategory={filters.category}
            setSelectedCategory={(category) =>
              changeFilter("category", category)
            }
          />
        </Slider>
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilter("keywords", keywords)}
      />
    </div>
  );
};

export default NewsFilters;