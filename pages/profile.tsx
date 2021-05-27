import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// export default function Profile() {
const Profile = ({ user }) => {
    console.log(user);
    return (
        <div>
            <p>HELLO</p>
            {user && (
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )}
        </div>
    );
};
export const getServerSideProps = withPageAuthRequired();

export default Profile;
