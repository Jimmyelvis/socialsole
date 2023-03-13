import { CardPicOverlay } from "./CardPicOverlay";
import { Label } from "./components/Label";

export const NewRelease = ({ sneaker, price, date, sizeRun, colors, imgBg }) => {

  return (
    <CardPicOverlay imgBg={imgBg}>
      <div className="new-release">

        <Label label="Latest Release" />
        
        <div className="new-release-content">
          <div className="sneaker">{sneaker}</div>

          <div className="price-date">
            <span className="price">{price}</span> - <span className="date">{date}</span>
          </div>
        </div>

        <div className="new-release-footer">
          <ul>
            <li className="label">Size Run:</li>
            <li>{sizeRun}</li>
          </ul>

          <ul>
            <li className="label">Colorway:</li>
            {
              colors.map((color, index) => {
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
