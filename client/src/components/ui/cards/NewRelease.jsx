import { CardPicOverlay } from "./CardPicOverlay";
import { Label } from "./components/Label";
import { getFormattedDate } from "utils/formatDate";
import { Link } from "react-router-dom";

export const NewRelease = ({ sneaker, price, date, sizeRun, colors, imgBg, contentId, label }) => {

  const renderLabel = () => { 
    if (label === false) {
      return ""
    } else {
      return <Label label="Latest Release" />
    }
   }

  return (
    <CardPicOverlay imgBg={imgBg} contentId={contentId}>
      <div className="new-release">

        {
          renderLabel()
        }
        
        <div className="new-release-content">
          <div className="sneaker">
            <Link to={`/article/${contentId}`}>
              {sneaker}
            </Link>
          </div>

          <div className="price-date">
            <span className="price">$ {price}</span> - <span className="date">
              {getFormattedDate(date)}
            </span>
          </div>
        </div>

        <div className="new-release-footer">
          <ul>
            <li className="label">Size Run:</li>
            <li>
              {sizeRun.map((size, index) => {
                return (
                  <span key={index}>{size} </span>
                ) 
              })
              }
            </li>
          </ul>

          <ul>
            <li className="label">Colorway:</li>
            {
              colors
              .slice(0, 3)
              .map((color, index) => {
                return (
                  <li key={index}>{color}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </CardPicOverlay>
  );
};
