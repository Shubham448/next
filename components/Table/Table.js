import { Table } from "reactstrap";

export default function ModifiedTable(props) {
    const tableHead =
      props.data &&
      props.data.map((el, index) => {
        return (
          <th
            style={el.style === "center" ? { textAlign: "center" } : null}
            key={index}
            width={el.width ? el.width : ""}
          >
            {el.name}
          </th>
        );
      });
    return (
      <>
          <Table responsive hover striped bordered>
            <thead>
              <tr>{tableHead}</tr>
            </thead>
            <tbody>{props.children}</tbody>
          </Table>
      </>
    );
};