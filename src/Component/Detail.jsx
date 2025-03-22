import { useParams } from "react-router-dom";
import FetchRecipeById from "./FetctRecipeById.jsx";
const Detail = () => {
  const { id } = useParams();

  return (
    <div>
      <FetchRecipeById id={id} />
    </div>
  );
};

export default Detail;
