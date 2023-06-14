import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
  return (
    <table className="table__content">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default Table;
