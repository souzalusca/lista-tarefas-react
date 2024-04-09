import React from "react";
import * as C from "../Pagination/pagination.styled"; // Altere o nome do arquivo para corresponder ao caminho real do arquivo de estilos
interface PaginationProps {
  limit: number;
  total: number;
  offset: number;
  setOffset: (offset: number) => void;
}

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination: React.FC<PaginationProps> = ({ limit, total, offset, setOffset }) => {
    const current = Math.floor(offset / limit) + 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - MAX_LEFT, 1);
    const maxItems = Math.min(MAX_ITEMS, pages);
  
    return (
      <C.Container> {/* Use o componente estilizado correto aqui */}
        <ul className="pagination-list">
          {Array.from({ length: maxItems }).map((_, i) => i + first).map((page) => (
            <li key={page}>
              <button onClick={() => setOffset(page - 1)}
              className={page === current ? "pagination__item--active" : ""}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </C.Container>
    );
  };
  
  export default Pagination;
