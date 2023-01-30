import styled from "styled-components";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

const Table = styled.table`
   width: 100%;
`;

const TableRow = styled.tr`
   &:nth-child(even) {
      background-color: #f2f2f2;
   }
`;

const TableCell = styled.td`
   padding: 10px;
   border-bottom: 1px solid #ddd;
`;

const SearchInput = styled.input`
   margin: 10px;
   padding: 10px;
   border: none;
   border-radius: 5px;
   font-size: 16px;
`;

const SearchButton = styled.button`
   margin: 10px;
   padding: 10px;
   border: none;
   border-radius: 5px;
   font-size: 16px;
   background-color: #0074d9;
   color: #fff;
   &:hover {
      cursor: pointer;
      background-color: #0057e7;
   }
`;

const PaginationLink = styled.a`
   padding: 8px 16px;
   text-decoration: none;
   &:hover {
      background-color: #ddd;
      cursor: pointer;
   }
`;

const PaginationButton = styled.button`
   padding: 8px 16px;
   background-color: #ddd;
   border: none;
   text-decoration: none;
   &:hover {
      cursor: pointer;
   }
`;
const Home = () => {
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   const [dataPerPage] = useState(10);

   useEffect(() => {
      const indexOfLastData = currentPage * dataPerPage;
      const indexOfFirstData = indexOfLastData - dataPerPage;
      setData(data.slice(indexOfFirstData, indexOfLastData));
      fetch("/api/hallo")
         .then((response) => response.json())
         .then((data) => setData(data));
   }, [data, currentPage, dataPerPage]);

   const [searchInput, setSearchInput] = useState("");

   const filteredData = data.filter((item) => {
      return item.idx.includes(searchInput) || item.email.includes(searchInput) || item.name.includes(searchInput) || item.nickname.includes(searchInput);
   });
   <>
      <Table>
         <form>
            <SearchInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <SearchButton type="submit">Search</SearchButton>
            <SearchButton onClick={() => setSearchInput("")}>Clear</SearchButton>
         </form>
         <tbody>
            {data.map((item, idx) => (
               <TableRow key={idx}>
                  <TableCell>{item.idx}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.nickname}</TableCell>
               </TableRow>
            ))}
         </tbody>
      </Table>
      <ReactPaginate
         previousLabel={<PaginationButton>previous</PaginationButton>}
         nextLabel={<PaginationButton>next</PaginationButton>}
         breakLabel={"..."}
         breakClassName={"break-me"}
         pageCount={Math.ceil(filteredData.length / dataPerPage)}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={(data) => setCurrentPage(data.selected)}
         containerClassName={"pagination"}
         pageLinkClassName={PaginationLink.className}
         previousClassName={"previous-link"}
         nextClassName={"next-link"}
         disabledClassName={"disabled"}
         activeClassName={"active"}
      />
   </>;
};

export default Home;
