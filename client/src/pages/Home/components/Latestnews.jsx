import { Link } from "react-router-dom";
import { Label } from "components/ui/cards/components/Label";
import { Sectionheading } from "components/ui/headers/Sectionheading";

export const Latestnews = ({ articles }) => {


     const getLabelSize = (index) => { 

        if (index > 1) {
          return true
        } 

      }



  return (
    <div className="latest-news">
      <>
        
        <Sectionheading heading="Latest News" />

        <div className="latest-news-grid">
          {articles
          .filter((article) => {
            return article.newstype  === "news";
          })
          .slice(0, 5)
          .map((article, index) => {
            return (
              <div className={`card-ver-overlay-notrans news-item news-item-${index}`} key={index}>
                <Label 
                  label="Latest News"
                  small={getLabelSize(index)}           
                />
                
                <Link to={`/article/${article._id}`}>
                  <img className="cardbg" src={article.fullheaderimage} alt="..." />
                  <div className="overlay"></div>

                  <div className="card-content">
                    <h3 className="heading-3">{article.headline}</h3>
                  </div>
                </Link>

              </div>
            );
          })}
        </div>
      </>
    </div>
  );
};
