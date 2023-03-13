import { Link } from "react-router-dom";
import { Label } from "components/ui/cards/components/Label";
import { Sectionheading } from "components/ui/headers/Sectionheading";

export const Latestnews = ({ articles }) => {
  /*
    To get these articles to display properly you will need to edit
    the details below, such as the link address headings and text, and image
     to match the articles you created.
  */

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
          {articles.map((article, index) => {
            return (
              <div className={`card-ver-overlay-notrans news-item news-item-${index}`} key={index}>
                <Label 
                  label="Latest News"
                  small={getLabelSize(index)}           
                />
                
                <Link to={`/article/${article.id}`}>
                  <img className="cardbg" src={article.image} alt="..." />
                  <div className="overlay"></div>

                  <div className="card-content">
                    <h3 className="heading-3">{article.title}</h3>
                    <h4 className="heading-4">{article.subheadline}</h4>
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
