import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {AdminLayout} from "../components/layout/AdminLayout";
import { AdminContextProvider } from "context/AdminContextProvider";
import { getAllUsers } from "actions/authActions";
import { getArticles } from "actions/articleActions";
import { getPosts } from "actions/postActions";
import { getSneakers } from "actions/sneakerActions";
import { getProfiles } from "actions/profileActions";
import { SmallDataCard } from "../components/cards/SmallDataCard";
import { ImUsers } from 'react-icons/im';
import { Panel } from "components/ui/Panel";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";


const Admin_Dashboard = ({
  profile: { profile, profiles, loading },
  auth: { user, users },
  article: { articles },
  sneaker: { sneakers },
  post: { posts },
  getAllUsers,
  getArticles,
  getPosts,
  getSneakers,
  getProfiles,
}) => {

  useEffect(() => {
    getAllUsers();
    getArticles();
    getPosts();
    getSneakers();
    getProfiles();
  }, []);

  return (
    <AdminContextProvider>
      <AdminLayout>
        
        <div className="small-data-cards">

          <SmallDataCard
            title="Users"
            data={users && users.length}
            type="users"
            link="/admin/users"
          />

          <SmallDataCard
            title="Posts"
            data={posts && posts.length}
            type="posts"
            link="/admin/posts"
          />

          <SmallDataCard
            title="Articles"
            data={articles && articles.length}
            type="articles"
            link="/admin/articles"
          />

          <SmallDataCard
            title="Sneakers"
            data={sneakers && sneakers.length}
            type="sneakers"
            link="/admin/sneakers"
          />

        </div>

        <Panel className="newest-members">

          <div className="newest-members-heading">

            <ImUsers className="icon icon-users" />
            <h3 className="heading-3">Newest Members</h3>

          </div>

            <div className="newest-members-list">
              {
                profiles && profiles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 4)
                .map((profile, index) => {
                  return (
                    <CardPicOverlay
                      key={index}
                      imgBg={profile.user?.avatar}
                      index={index}
                      className="newest-members-card"
                      >
                        <h3 className="heading-3 user-name">
                          {profile.user?.name}
                        </h3>

                        {
                          profile.favsneaker && (
                            <h4 className="heading-4 favsneaker">
                              Fav Sneaker: <span className="sneaker">
                                {profile.favsneaker}
                              </span>
                            </h4>
                          )
                        }

                    </CardPicOverlay>
                  )
                })
              }
            </div>

        </Panel>
      </AdminLayout>
    </AdminContextProvider>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  article: state.article,
  sneaker: state.sneaker,
  post: state.post
});

export const AdminDashboardHome = connect(mapStateToProps, 
  { getAllUsers, getArticles, getPosts, getSneakers, getProfiles })(Admin_Dashboard);
