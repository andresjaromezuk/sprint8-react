

function ChartRow(props) {
  return (
    <tr>
      <td>{props.product.id}</td>
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
      <td>{props.product.Type.name}</td>
      <td>{props.product.Size.name}</td>
      <td>{props.product.Fee.number}</td>
      <td>{props.product.Category.name}</td>
      <td><a href={props.url}>Ver</a></td>
    </tr>
  );
}

export default ChartRow;
