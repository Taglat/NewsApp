import { getNews } from "../../api/apiNews.ts";
import { PAGE_SIZE, TOTAL_PAGES } from "../../constants/constants.js";
import { useDebounce } from "../../helpers/hooks/useDebounce.js";
import { useFetch } from "../../helpers/hooks/useFetch.js";
import { useFilters } from "../../helpers/hooks/useFilters.js";
import NewsFilters from "../NewsFilters/NewsFilters.jsx";
import NewsList from "../NewsList/NewsList.jsx";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper.jsx";
import styles from "./styles.module.css";

const NewsByFilters = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch<NewsApiResponse, ParamsType>(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter("page_number", filters.page_number + 1);
    }
  };

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter("page_number", filters.page_number - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    changeFilter("page_number", pageNumber);
  };

  return (
    <section className={styles.section}>
      <NewsFilters changeFilter={changeFilter} filters={filters} />

      <PaginationWrapper
        top
        bottom
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;