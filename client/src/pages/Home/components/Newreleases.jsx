import React from 'react'
import { NewRelease } from 'components/ui/cards/NewRelease'
import { Sectionheading } from 'components/ui/headers/Sectionheading'

export const Newreleases = ({ releases }) => {

  return (
    <React.Fragment>
      
      <div className="new-releases">

        <Sectionheading heading="New Releases" />

        <div className="new-releases-grid">

          {
            releases.map((release, index) => {
              return (
                <NewRelease
                  key={index}
                  sneaker={release.sneaker}
                  price={release.price}
                  date={release.date}
                  sizeRun={release.sizerun}
                  colors={release.colors}
                  imgBg={release.imgBg}
                />
              )
            })
          }
        </div>

      </div>

    </React.Fragment>
  )
}
